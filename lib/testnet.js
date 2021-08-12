const Binance = require('node-binance-api');
require('dotenv').config();

// B i n a n c e - N o d e - A P I  O p t i o n s
const binance = new Binance().options({
  APIKEY: process.env.TESTNET_APIKEY,
  APISECRET: process.env.TESTNET_SECRET,
  useServerTime: true,
  recvWindow: 2000,
  verbose: false,
  test: true,
  reconnect: true,
});

//  T e s t  M o d e
// console.log("Test Mode: ", binance.getOption('test'));

module.exports = binance;
