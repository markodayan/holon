declare interface IPortMap {
  [port: number]: string;
}

declare interface SubscriptionInitMessage {
  jsonrpc: '2.0';
  id: number;
  result: string;
}

declare interface BlockHeaderMessage {
  jsonrpc: '2.0';
  method: string;
  params: {
    subscription: string;
    result: {
      number: string;
      hash: string;
      parentHash: string;
      sha3Uncles: string;
      logsBloom: string;
      transactionsRoot: string;
      stateRoot: string;
      receiptsRoot: string;
      miner: string;
      difficulty: string;
      extraData: string;
      gasLimit: string;
      gasUsed: string;
      timestamp: string;
      baseFeePerGas: string;
      nonce: string;
      mixHash: string;
    };
  };
}

declare type SubscriptionMessage = SubscriptionInitMessage | BlockHeaderMessage;
