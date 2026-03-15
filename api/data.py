import os
import sys
import json
import random
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from web3 import Web3

# Add current directory to path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

try:
    from sdk.polkadot import PolkadotClient
except ImportError as e:
    # Fallback for different Vercel structures
    sys.path.insert(0, os.path.join(current_dir, "api"))
    from sdk.polkadot import PolkadotClient

# Configuration
RPC_URL = os.environ.get("RPC_URL", "https://services.polkadothub-rpc.com/testnet")
DEPLOYMENT_PATH = os.path.join(current_dir, "luxtensor", "contracts", "deployments-polkadot.json")
PRIVATE_KEY = os.environ.get("PRIVATE_KEY", "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            client = PolkadotClient(
                rpc_url=RPC_URL,
                private_key=PRIVATE_KEY,
                deployment_path=DEPLOYMENT_PATH
            )

            if not client.is_connected:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Failed to connect to RPC"}).encode())
                return

            # Fetch Basic Stats
            raw_total_staked = client.staking.total_staked()
            total_staked = float(Web3.from_wei(raw_total_staked, 'ether'))
            total_supply = float(client.token.total_supply()) / 10**18
            
            PRICE_PLACEHOLDER = 423.5
            final_cap = total_supply * PRICE_PLACEHOLDER
            
            # Subnets and Nodes
            subnet_count = client.subnet.get_subnet_count()
            e_config = client.subnet.get_emission_config()
            emission_per_block = float(Web3.from_wei(e_config['emission_per_block'], 'ether'))

            subnets = []
            validator_entities = {}
            candidate_addresses = set()
            
            # Optimized: Only fetch the first few subnets for speed in serverless context
            # Vercel has a 10-15s timeout on Hobby plan, 60-300s on Pro
            max_subnets = 4 
            for i in range(1, min(int(subnet_count) + 1, max_subnets + 1)):
                try:
                    s_info = client.subnet.get_subnet(i)
                    metagraph = client.subnet.get_metagraph(i)
                    
                    min_stake_ether = float(Web3.from_wei(s_info.min_stake, 'ether'))
                    burn_rate = emission_per_block * (s_info.emission_share / 10000.0)
                    difficulty = (s_info.node_count / s_info.max_nodes) * 20.0 if s_info.max_nodes > 0 else 0.0

                    subnet_nodes = []
                    for node in metagraph.nodes:
                        if node.active:
                            # Synthetic history for serverless (stateless)
                            base_val = max(node.emission_ether, 0.001)
                            synthetic_history = [
                                round(base_val * (1 + random.uniform(-0.1, 0.1)), 4) 
                                for _ in range(10)
                            ]
                            
                            subnet_nodes.append({
                                "uid": node.uid,
                                "hotkey": node.hotkey,
                                "coldkey": node.coldkey,
                                "type": "Validator" if node.is_validator else "Miner",
                                "stake": node.stake / 1e18,
                                "delegated_stake": node.delegated_stake / 1e18,
                                "rank": node.rank_float,
                                "trust": node.trust_float,
                                "incentive": float(node.incentive) / 1e18 if node.incentive > 0 else 0.0,
                                "emission": node.emission_ether,
                                "active": node.active,
                                "performance_history": synthetic_history
                            })

                    subnet_nodes.sort(key=lambda x: x['stake'], reverse=True)

                    subnets.append({
                        "id": f"SN{i}",
                        "netuid": i,
                        "title": s_info.name if s_info.name else f"Subnet {i}",
                        "total_stake": float(Web3.from_wei(metagraph.total_stake, 'ether')),
                        "nodes": subnet_nodes[:50], # Limit for performance
                        "miners": str(len(metagraph.miners)),
                        "validators": str(len(metagraph.validators)),
                        "emission": f"{s_info.emission_percent}%",
                        "registration_cost": min_stake_ether,
                        "difficulty": round(difficulty, 2),
                        "burn_rate": round(burn_rate, 2),
                    })

                    for v in metagraph.validators:
                        addr = v.coldkey
                        candidate_addresses.add(addr)
                        if addr not in validator_entities:
                            validator_entities[addr] = {"total_stake": 0.0, "total_yield": 0.0, "node_count": 0}
                        validator_entities[addr]["total_stake"] += v.total_stake_ether
                        validator_entities[addr]["total_yield"] += v.emission_ether
                        validator_entities[addr]["node_count"] += 1

                except Exception as e:
                    continue

            all_validators = []
            for addr, entity in validator_entities.items():
                all_validators.append({
                    "id": addr,
                    "name": f"Validator {addr[:8]}...",
                    "address": addr,
                    "stake": f"{entity['total_stake']:,.0f}",
                    "yield": f"{entity['total_yield']:,.1f}"
                })
            all_validators.sort(key=lambda x: float(x['stake'].replace(',', '')), reverse=True)

            data = {
                "last_updated": datetime.now().isoformat(),
                "network": {
                    "block": client.block_number,
                    "total_staked": total_staked,
                    "total_supply": total_supply,
                    "market_cap": final_cap,
                },
                "subnets": subnets,
                "validators": all_validators[:20],
                "accounts": {}, # Indexed on demand or simplified for serverless
                "transactions": {}
            }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
        return
