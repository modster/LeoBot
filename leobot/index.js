module.exports = async function (context, req) {
    context.log('     .~~~~~~~~~~~~~~~~~~L3OBOT~~~~~~~~~~~~~~~~~.    ');
    try {
        const binance = require('../lib/header.js') ///<-------------
        //const balance = require('../lib/balance.js') ///<-------------

        // Variables:
        const symbol = req.body.symbol
        const side = req.body.side
        const close = req.body.close
        const bracket = req.body.bracket
        const amount = req.body.amount
        const stopPrice = req.body.stopPrice
        const type = "STOP_MARKET"
        const takeProfit = req.body.takeProfit
        const limit = req.body.limit
                
        // Market BUY order with a stop loss:
        if (side == "long") {
            // console.info(await binance.futuresCancelAll("BTCUSDT"))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount))
            // console.info(await binance.futuresBuy(symbol, amount, limit))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: type, stopPrice: stopPrice, reduceOnly: true }))
            // console.info(await binance.futuresMarketSell(symbol, amount, { type: type, stopPrice: stpPrc, closePosition: true }))
            // console.info(await binance.futuresSell(symbol, amount, limit, { reduceOnly: true }))
            // console.info(await binance.futuresMarketSell(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
        }

        // Market SELL ortder with a stop loss:
        if (side == "short") {
            // console.info(await binance.futuresCancelAll("BTCUSDT"))
            // console.info(await binance.futuresMarketSell(symbol, amount, { reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount))
            // console.info(await binance.futuresSell(symbol, amount, limit))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: type, stopPrice: stopPrice, reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { type: type, stopPrice: stopPrice, closePosition: true }))
            // console.info(await binance.futuresBuy(symbol, amount, limit, { reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, baseamount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
        }

        // Adjust the ratcheting stop:
        if (side == "exitLong") {
            console.info(await binance.futuresCancelAll("BTCUSDT"))
            // console.info(await binance.futuresSell(symbol, amount, limit, { reduceOnly: true}))
            // console.info(await binance.futuresMarketSell(symbol, amount, { reduceOnly: true}))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: type, stopPrice: stopPrice, priceProtect: true, closePosition: true }))
            // console.info(await binance.futuresMarketSell(symbol, amount, { type: type, stopPrice: stopPrice, reduceOnly: true }))
        }

        if (side == "exitShort") {
            console.info(await binance.futuresCancelAll("BTCUSDT")) // make timeinforce order
            // console.info(await binance.futuresBuy(symbol, amount, limit, { reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: type, stopPrice: stopPrice, priceProtect: true, closePosition: true }))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { type: type, stopPrice: stopPrice, reduceOnly: true }))
        }

        if (side == "closeLong") {
            //console.info(await binance.futuresCancelAll("BTCUSDT"))
            console.info(await binance.futuresMarketSell(symbol, amount, { reduceOnly: true }))
            // console.info(await binance.futuresMarketSell(symbol, baseamount, { reduceOnly: true}))
            // console.info(await binance.futuresMarketSell(symbol, baseamount, { type: type, stopPrice: stopPrice, priceProtect: true, closePosition: true }))
        }

        if (side == "closeShort") {
            // console.info(await binance.futuresCancelAll("BTCUSDT")) // make timeinforce order
            console.info(await binance.futuresMarketBuy(symbol, amount, { reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, baseamount, { reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, baseamount, { type: type, stopPrice: stopPrice, priceProtect: true, closePosition: true }))
        }

        // Exit and existing long position. Uses reduceOnly flag, bracket limit orders:
        if (side == "shortSqueeze") {
            let lmt = parseFloat(limit)
            for (i = 0; i < 3; i++) {
                console.info(await binance.futuresSell(symbol, amount, lmt, { reduceOnly: true }))
                lmt = lmt + 2000.00
                console.info(`lmt: ${lmt}`)
            }
        }

        // Exit and existing long position. Uses reduceOnly flag, bracket limit orders:
        if (side == "longSqueeze") {
            let lmt = parseFloat(limit)
            for (i = 0; i < 3; i++) {
                console.info(await binance.futuresBuy(symbol, amount, lmt, { reduceOnly: true }))
                lmt = lmt - 2000.00
                console.info(`lmt: ${lmt}`)
            }
        }

        // Req body trace:
        console.info(`symbol: ${symbol}`)
        console.info(`side: ${side}`)
        console.info(`amount: ${amount}`)
        console.info(`close: ${close}`)
        console.info(`stopPrice: ${stopPrice}`)
        console.info(`limit: ${limit}`)
        console.info(`takeProfit: ${takeProfit}`)
        console.info(`bracket: ${bracket}`)

        // R e s p o n s e
        context.res = {
            status: 200
        };
    }
    catch (error) {
        console.error(error)
        context.res = {
            status: 404
        }
    };
};