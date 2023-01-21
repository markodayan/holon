declare interface TransactionReceipt {
  blockHash: string;
  blockNumber: number; // conversion
  contractAddress: string | null;
  cumulativeGasUsed: number; // conversion
  effectiveGasPrice: number; // conversion
  from: string;
  gas_used: number; // conversion
  logs: TransactionLogItem[];
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: number; // conversion
  type: number; // conversion
}

declare interface TransactionLogItem {
  address: string;
  blockHash: string;
  blockNumber: number; // conversion
  data: string;
  logIndex: number; // conversion
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}
