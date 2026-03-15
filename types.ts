export enum ViewState {
  SUBNETS = 'SUBNETS',
  SUBNET_NODES = 'SUBNET_NODES',
  SUBNET_WEIGHTS = 'SUBNET_WEIGHTS',
  VALIDATORS = 'VALIDATORS',
  VALIDATOR_DETAIL = 'VALIDATOR_DETAIL',
  ACCOUNT = 'ACCOUNT',
  ACCOUNT_HISTORY = 'ACCOUNT_HISTORY',
  CONTRACT_DETAILS = 'CONTRACT_DETAILS',
  TOKENOMICS = 'TOKENOMICS',
  TRANSACTION_DETAILS = 'TRANSACTION_DETAILS',
  BLOCK_DETAILS = 'BLOCK_DETAILS',
  SUBNET_REGISTRATION = 'SUBNET_REGISTRATION',
  SUBNET_DISTRIBUTION = 'SUBNET_DISTRIBUTION'
}

// ═══════════════════════════════════════════════════════
// Data Bridge Types — matches output of data_bridge.py
// ═══════════════════════════════════════════════════════

export interface BridgeNetwork {
  block: number;
  total_staked: number;
  total_supply: number;
  market_cap: number;
  tps: number;
  gas: number;
  active_accounts: number;
}

export interface BridgeNode {
  uid: number;
  hotkey: string;
  coldkey: string;
  type: 'Validator' | 'Miner';
  stake: number;
  delegated_stake: number;
  rank: number;
  trust: number;
  incentive: number;
  emission: number;
  active: boolean;
  performance_history: number[];
}

export type WeightMatrix = Record<string, Record<string, number>>;

export interface BridgeSubnet {
  id: string;
  netuid: number;
  title: string;
  subtitle: string;
  owner: string;
  active: boolean;
  emission: string;
  emission_share: number;
  desc: string;
  miners: string;
  validators: string;
  unique_validators: string;
  tempo: string;
  max_nodes: number;
  total_stake: number;
  registration_cost: number;
  difficulty: number;
  burn_rate: number;
  nodes: BridgeNode[];
  weights: WeightMatrix;
}

export interface BridgeValidator {
  id: string;
  name: string;
  address: string;
  stake: string;
  stakeVal: string;
  fee: string;
  apy: string;
  yield: string;
  voter_power: string;
}

export interface BridgeAccount {
  address: string;
  label: string;
  balance: number;
  staked: number;
  rewards: number;
  total: number;
  is_simulated: boolean;
}

export interface BridgeTransaction {
  hash: string;
  method: string;
  block: number;
  amount: number;
  timestamp: string;
  status: 'Success' | 'Failed';
  from: string;
  to: string;
  type: 'Transfer' | 'Stake' | 'Reward' | 'Registration' | 'Other';
}

export interface BridgeData {
  last_updated: string;
  network: BridgeNetwork;
  subnets: BridgeSubnet[];
  validators: BridgeValidator[];
  accounts: Record<string, BridgeAccount>;
  transactions: Record<string, BridgeTransaction[]>;
}

// ═══════════════════════════════════════════════════════
// UI Types
// ═══════════════════════════════════════════════════════

export interface Subnet {
  rank: number;
  name: string;
  netUid: number;
  emission: number;
  miners: number;
  staked: string;
  daily: string;
  status: 'active' | 'inactive' | 'warning';
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected';
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  proposer: string;
  endsIn?: string;
  endedDate?: string;
  totalVotes: string;
}

export interface Validator {
  rank: number;
  identity: string;
  address: string;
  stake: string;
  stakeUsd: string;
  fee: number;
  apy: number;
  yield24h: string;
  voterPower: string;
  verified: boolean;
  avatarColor: string;
  trust?: number;
  incentive?: number;
  performance_history?: number[];
}