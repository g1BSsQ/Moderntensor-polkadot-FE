import os
import sys
import json
import random
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from web3 import Web3

# Add lib directory to path for SDK imports
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(current_dir, "_lib"))

try:
    from sdk.polkadot import PolkadotClient
except ImportError as e:
    # Fallback for absolute pathing in some environments
    sys.path.insert(0, os.path.join(current_dir, "api", "_lib"))
    from sdk.polkadot import PolkadotClient

# Configuration
RPC_URL = os.environ.get("RPC_URL", "https://services.polkadothub-rpc.com/testnet")
DEPLOYMENT_PATH = os.path.join(current_dir, "_lib", "luxtensor", "contracts", "deployments-polkadot.json")
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

                    # Fetch weight matrix for this subnet (First 20 validators for performance)
                    weights_matrix = {}
                    for val in metagraph.validators[:20]:
                        try:
                            w_uids, w_vals = client.subnet.get_weights(i, val.uid)
                            if w_uids:
                                weights_matrix[str(val.uid)] = {str(u): int(w) for u, w in zip(w_uids, w_vals)}
                        except:
                            pass

                    # Count unique validators
                    unique_validator_coldkeys = set()
                    for v in metagraph.validators:
                        unique_validator_coldkeys.add(v.coldkey)

                    subnets.append({
                        "id": f"SN{i}",
                        "netuid": i,
                        "title": s_info.name if s_info.name else f"Subnet {i}",
                        "subtitle": "Active Subnet",
                        "owner": s_info.owner,
                        "active": s_info.active,
                        "desc": f"Decentralized network for {s_info.name if s_info.name else 'AI Inference'}.",
                        "total_stake": float(Web3.from_wei(metagraph.total_stake, 'ether')),
                        "nodes": subnet_nodes[:100], # Increased limit
                        "miners": str(len(metagraph.miners)),
                        "validators": str(len(metagraph.validators)),
                        "unique_validators": str(len(unique_validator_coldkeys)),
                        "tempo": f"{s_info.tempo} blk",
                        "max_nodes": s_info.max_nodes,
                        "emission": f"{s_info.emission_percent}%",
                        "emission_share": s_info.emission_share,
                        "registration_cost": min_stake_ether,
                        "difficulty": float(difficulty) if difficulty else 0.0,
                        "burn_rate": float(burn_rate) if burn_rate else 0.0,
                        "weights": weights_matrix
                    })

                    for v in metagraph.validators:
                        addr = v.coldkey
                        candidate_addresses.add(addr)
                        if addr not in validator_entities:
                            validator_entities[addr] = {
                                "direct_stake": 0.0,
                                "delegated_stake": 0.0,
                                "total_stake": 0.0,
                                "total_yield": 0.0,
                                "node_count": 0,
                                "max_trust": 0.0
                            }
                        entity = validator_entities[addr]
                        entity["direct_stake"] += v.stake / 1e18
                        entity["delegated_stake"] += v.delegated_stake / 1e18
                        entity["total_stake"] += v.total_stake_ether
                        entity["total_yield"] += v.emission_ether
                        entity["node_count"] += 1
                        entity["max_trust"] = max(entity["max_trust"], v.trust_float)

                except Exception as e:
                    continue

            PRICE_PLACEHOLDER = 423.5
            all_validators = []
            for addr, entity in validator_entities.items():
                total_stake = entity["total_stake"]
                stake_val = total_stake * PRICE_PLACEHOLDER
                stake_str = f"${(stake_val / 1_000_000):,.1f}M" if stake_val >= 1_000_000 else f"${(stake_val / 1000):,.1f}K"
                
                all_validators.append({
                    "id": addr,
                    "name": f"Validator {addr[:8]}...",
                    "address": addr,
                    "stake": f"{total_stake:,.0f}",
                    "direct_stake": f"{entity['direct_stake']:,.0f}",
                    "delegated_stake": f"{entity['delegated_stake']:,.0f}",
                    "stakeVal": stake_str,
                    "fee": "18.0%",
                    "voter_power": f"{total_stake**0.5:,.1f}",
                    "apy": f"{(entity['max_trust'] * 20):,.1f}%",
                    "yield": f"{entity['total_yield']:,.1f}"
                })
            all_validators.sort(key=lambda x: float(x['stake'].replace(',', '')), reverse=True)

            # 2. Collect Transactions/Events (Last 50 blocks for performance)
            transactions_data = {}
            accounts_data = {}
            try:
                current_block = client.block_number
                from_block = max(0, current_block - 50)
                
                # MDTToken Transfers
                try:
                    token_contract = client.token._token
                    transfers = token_contract.events.Transfer.get_logs(fromBlock=from_block)
                    current_iso = datetime.now().isoformat()
                    for log in transfers:
                        args = log['args']
                        addr_from = args['from'].lower()
                        addr_to = args['to'].lower()
                        tx = {
                            "hash": log['transactionHash'].hex(),
                            "method": "transfer",
                            "block": log['blockNumber'],
                            "amount": float(Web3.from_wei(args['value'], 'ether')),
                            "timestamp": current_iso,
                            "status": "Success",
                            "from": args['from'],
                            "to": args['to'],
                            "type": "Transfer"
                        }
                        if addr_from not in transactions_data: transactions_data[addr_from] = []
                        transactions_data[addr_from].append(tx)
                        if addr_to not in transactions_data: transactions_data[addr_to] = []
                        transactions_data[addr_to].append(tx)
                except: pass

                # MDTStaking Stakes
                try:
                    staking_contract = client.staking._staking
                    stakes = staking_contract.events.Staked.get_logs(fromBlock=from_block)
                    current_iso = datetime.now().isoformat()
                    for log in stakes:
                        args = log['args']
                        addr = args['staker'].lower()
                        tx = {
                            "hash": log['transactionHash'].hex(),
                            "method": "add_stake",
                            "block": log['blockNumber'],
                            "amount": float(Web3.from_wei(args['amount'], 'ether')),
                            "timestamp": current_iso,
                            "status": "Success",
                            "from": args['staker'],
                            "to": "Staking Contract",
                            "type": "Stake"
                        }
                        if addr not in transactions_data: transactions_data[addr] = []
                        transactions_data[addr].append(tx)
                except: pass

                # Populate a few top accounts with real balances
                for addr in list(candidate_addresses)[:20]:
                    try:
                        balance = client.token.balance_of_ether(addr)
                        s_info = client.staking.get_stake_info(addr)
                        accounts_data[addr] = {
                            "address": addr,
                            "label": f"Account {addr[:6]}",
                            "balance": float(balance),
                            "staked": s_info.total_locked_ether,
                            "rewards": s_info.pending_bonus_ether,
                            "total": float(balance) + s_info.total_locked_ether,
                            "is_simulated": False
                        }
                    except: pass
            except: pass

            data = {
                "last_updated": datetime.now().isoformat(),
                "network": {
                    "block": client.block_number,
                    "total_staked": total_staked,
                    "total_supply": total_supply,
                    "market_cap": final_cap,
                    "tps": 0.0,
                    "gas": 1.2,
                    "active_accounts": len(accounts_data)
                },
                "subnets": subnets,
                "validators": all_validators[:50],
                "accounts": accounts_data,
                "transactions": transactions_data
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
