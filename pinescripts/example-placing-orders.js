// P L A C I N G  O R D E R S
// Some examples of the most common types of orders placed on Binance Futures Exchange 
// using node-binance-api and Azure Functions

if (side == "long") {

    // Cancel all open orders:
    console.info(await binance.futuresCancelAll("BTCUSDT"))

    // Market Order Buy:
    console.info(await binance.futuresMarketBuy(symbol, amount))

    // Exit a short position using 'reduceOnly':
    console.info(await binance.futuresMarketBuy(symbol, amount, { reduceOnly: true }))

    // Limit Order Buy:
    console.info(await binance.futuresBuy(symbol, amount, limit))

    // Stop Loss for a long position:
    console.info(await binance.futuresMarketSell(symbol, amount, { type: type, stopPrice: stopPrice, reduceOnly: true }))

    // Close Position:
    console.info(await binance.futuresMarketSell(symbol, amount, { type: type, stopPrice: stopPrice, closePosition: true }))

    // Limit Order Sell using 'reduceOnly":
    console.info(await binance.futuresSell(symbol, amount, limit, { reduceOnly: true }))

    // Take Profit Market Order:
    console.info(await binance.futuresMarketSell(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true }))
}

// Market Order: SELL w/ a stop loss:
if (side == "short") {

    // Cancel all open orders:
    console.info(await binance.futuresCancelAll("BTCUSDT"))

    // Market Order Sell:
    console.info(await binance.futuresMarketSell(symbol, amount))

    // Exit a long position using 'reduceOnly':
    console.info(await binance.futuresMarketSell(symbol, amount, { reduceOnly: true }))

    // Limit Order Sell
    console.info(await binance.futuresSell(symbol, amount, limit))

    // Stop Loss for a short position:
    console.info(await binance.futuresMarketBuy(symbol, amount, { type: type, stopPrice: stopPrice, reduceOnly: true }))
    
    // Close Position:
    console.info(await binance.futuresMarketBuy(symbol, amount, { type: type, stopPrice: stopPrice, closePosition: true }))
    
    // Limit Order Buy using 'reduceOnly":
    console.info(await binance.futuresBuy(symbol, amount, limit, { reduceOnly: true }))

    // Take Profit Market Order:
    console.info(await binance.futuresMarketBuy(symbol, baseamount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
}

// Others:
// another way to tale-profit:
// console.info(await binance.futuresSell(symbol, amount, limit, { reduceOnly: true}))
// console.info(await binance.futuresBuy(symbol, amount, limit, { reduceOnly: true }))

// using priceProtect flag:
// console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, priceProtect: true, closePosition: true }))
// console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, priceProtect: true, closePosition: true }))
