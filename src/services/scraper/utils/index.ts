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

export { fetchJSONRPCDetails };
