import { utils } from 'noob-ethereum';

function fetchJSONRPCDetails() {
  let http = process.env.THIRD_PARTY_HTTP;
  let ws = process.env.THIRD_PARTY_WS;

  if (!process.env.THIRD_PARTY_HTTP) {
    http = `http://${process.env.HOST_IP_ADDR}:8545`;
    ws = `ws://${process.env.HOST_IP_ADDR}:8546`;
  }

  return {
    http_url: http,
    ws_url: ws,
  };
}

function parseBlockTransactions(raw: RawTransactionBody[]): TransactionBody[] {
  return raw.map((t: RawTransactionBody) => {
    let sanitised = {
      blockHash: t.blockHash,
      blockNumber: utils.decimal(t.blockNumber),
      chainId: utils.decimal(t.chainId),
      from: t.from,
      gas: utils.decimal(t.gas),
      gasPrice: utils.toGwei(t.gasPrice, 'wei') as number,
      hash: t.hash,
      input: t.input,
      nonce: utils.decimal(t.nonce),
      r: t.r,
      s: t.s,
      to: t.to,
      transactionIndex: utils.decimal(t.transactionIndex),
      type: utils.decimal(t.type),
      v: t.v,
      value: utils.gweiToEther(utils.toGwei(t.value, 'wei') as number),
    } as TransactionBody;

    if (sanitised.type === 1) {
      sanitised.accessList = t.accessList;
    } else if (sanitised.type === 2) {
      sanitised.maxFeePerGas = utils.toGwei(t.maxFeePerGas, 'wei') as number;
      sanitised.maxPriorityFeePerGas = utils.toGwei(t.maxPriorityFeePerGas, 'wei') as number;
    }

    return sanitised;
  });
}

export { fetchJSONRPCDetails, parseBlockTransactions };
