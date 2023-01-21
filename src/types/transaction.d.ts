declare interface TransactionBody {
  blockHash: string;
  blockNumber: number; // conversion
  chainId: number;
  from: string;
  gas: number; // conversion
  gasPrice: number; // conversion
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: number; // conversion
  type: number; // conversion
  v: string;
  value: number; // conversion
}

declare type LegacyTransaction = TransactionBody;

declare interface EIP2930Transaction extends TransactionBody {
  accessList: string[];
}

declare interface EIP1559Transaction extends TransactionBody {
  accessList: string[];
  maxFeePerGas: number; // conversion
  maxPriorityFeePerGas: number; // conversion
}
