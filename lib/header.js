const Binance = require('node-binance-api');

// B i n a n c e - N o d e - A P I   O p t i o n s
module.exports = binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.SECRET,
  useServerTime: true,
  recvWindow: 5000, // Set a higher recvWindow to increase response timeout
  verbose: true, // Add extra output when subscribing to WebSockets, etc
  test: false,
  reconnect: true
  // to do: enable Logging
});

//  T e s t  M o d e
//console.log("Test Mode: ", binance.getOption('test'));

module.exports = binance;
