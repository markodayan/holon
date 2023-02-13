declare interface ReceiptBody {
  blockHash: string;
  blockNumber: number; // conversion
  contractAddress?: string;
  cumulativeGasUsed: number; // conversion
  effectiveGasPrice: number; // conversion
  from: string;
  gasUsed: number; // conversion
  logs?: string[];
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
