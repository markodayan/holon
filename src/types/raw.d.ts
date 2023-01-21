declare interface RawTransactionBody {
  blockHash: string;
  blockNumber: string;
  chainId: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
}

declare type RawLegacyTransaction = RawTransactionBody;

declare interface RawEIP2930Transaction extends RawTransactionBody {
  accessList: string[];
}

declare interface RawEIP1559Transaction extends RawTransactionBody {
  accessList: string[];
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

declare interface RawTransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: RawTransactionLogItem[];
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

declare interface RawTransactionLogItem {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}
