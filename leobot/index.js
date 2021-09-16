module.exports = async function (context, req) {
    context.log('     .~~~~~~~~~~~~~~~~~~L3OBOT~~~~~~~~~~~~~~~~~.    ');
    try {
        const binance = require('../lib/header.js')
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
        
        // Market Order: BUY
        if (side == "marketBuy") {
            console.info(await binance.futuresMarketBuy(symbol, amount))
        }
        // Market Order: SELL
        if (side == "marketSell") {
            console.info(await binance.futuresMarketSell(symbol, amount))
        }
        
        // Limit Buy Order w/ a stop loss:
        if (side == "limitBuy") {
            console.info(await binance.futuresBuy(symbol, amount, limit))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
        }

        // Limit Sell Order w/ a stop loss:
        if (side == "limitSell") {
            console.info(await binance.futuresSell(symbol, amount, limit))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
        }

        // Market Order: BUY w/ a stop loss:
        if (side == "long") {
            // console.info(await binance.futuresCancelAll("BTCUSDT"))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount))
            // console.info(await binance.futuresBuy(symbol, amount, limit))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            // console.info(await binance.futuresMarketSell(symbol, amount, { typr: "STOP_MARKET", stopPrice: stpPrc, closePosition: true }))
            // console.info(await binance.futuresSell(symbol, amount, limit, { reduceOnly: true }))
            // console.info(await binance.futuresMarketSell(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
        }

        // Market Order: SELL w/ a stop loss:
        if (side == "short") {
            // console.info(await binance.futuresCancelAll("BTCUSDT"))
            // console.info(await binance.futuresMarketSell(symbol, amount, { reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount))
            // console.info(await binance.futuresSell(symbol, amount, limit))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { typr: "STOP_MARKET", stopPrice: stopPrice, closePosition: true }))
            // console.info(await binance.futuresBuy(symbol, amount, limit, { reduceOnly: true }))
            // console.info(await binance.futuresMarketBuy(symbol, baseamount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
        }

        // Close long
        if (side == "closeLong") {
            console.info(await binance.futuresSell(symbol, amount, limit))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
        }
        
        // Close Short
        if (side == "closeShort") {
            console.info(await binance.futuresBuy(symbol, amount, limit))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
        }

        // Hedge Mode, Long
        if (side == "longHedge") {
            // console.info(await binance.futuresCancelAll("BTCUSDT")) // make timeinforce order
            // to do: add an if statement to see if there's any open poisition and if there are close them
            // first change leverage to 20x
            console.info( await binance.futuresLeverage( symbol, 20 ) );
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long" }))
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "long", type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "long", type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))
            // hedge:
            // increase leverage, our take profit is the other position's stopPrice
            console.info( await binance.futuresLeverage( symbol, 80 ) );
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "short" }))
            // console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "short", type: "TAKE_PROFIT_MARKET", stopPrice: stopPrice, reduceOnly: true} ))
        }
        
        // Hedge Mode, Short:
        if (side == "shortHedge") {
            // console.info(await binance.futuresCancelAll("BTCUSDT"))
            // to do: add an if statement to see if there's any open poisition and if there are close them
            // first change leverage to 20x
            console.info( await binance.futuresLeverage( symbol, 20 ) );
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "short" }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long", type: "STOP_MARKET", stopPrice: stopPrice }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long", type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit } ))
            // hedge:
            // increase leverage, our take profit is the other position's stopPrice
            console.info( await binance.futuresLeverage( symbol, 120 ) );
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long" }))
            // console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "short", type: "TAKE_PROFIT_MARKET", stopPrice: stopPrice } ))
        }

        // Exit an existing long position. Uses reduceOnly flag, bracket limit orders:
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
