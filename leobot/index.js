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
        const takeProfit = req.body.takeProfit
        const limit = req.body.limit
        const middle = req.body.middle
        const hedgeLeverage = 100

        
        // Spot Market Order: BUY
        if (side == "spotMarketBuy") {
            binance.marketBuy(symbol, amount)
        }

        // Spot Market Order: SELL
        if (side == "spotMarketSell") {
            binance.marketSell(symbol, amount)
        }

        // Set New Stop:
        if (side == "setNewStop") {
            binance.sell( symbol, amount, {stopPrice: stopPrice, type: "STOP_LOSS", reduceOnly=true}) // closePosition instead? type?
        }

        // Futures Market Order: BUY
        if (side == "marketBuy") {
            console.info(await binance.futuresMarketBuy(symbol, amount))
        }

        // Futures Market Order: SELL
        if (side == "marketSell") {
            console.info(await binance.futuresMarketSell(symbol, amount))
        }

        // Limit Buy Order w/ a stop loss:
        if (side == "limitBuy") {
            console.info(await binance.futuresBuy(symbol, amount, limit))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true }))
        }

        // Limit Sell Order w/ a stop loss:
        if (side == "limitSell") {
            console.info(await binance.futuresSell(symbol, amount, limit))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", stopPrice: stopPrice, reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true }))
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
            console.info(await binance.futuresCancelAll(symbol))
            // console.info(await binance.futuresSell(symbol, amount, limit, { reduceOnly: true }))
            console.info(await binance.futuresMarketSell(symbol, amount, { type: "STOP_MARKET", positionSide: "long", stopPrice: middle, closePosition: true }))
        }

        // Close Short
        if (side == "closeShort") {
            console.info(await binance.futuresCancelAll(symbol))
            // console.info(await binance.futuresBuy(symbol, amount, limit, { reduceOnly: true }))
            console.info(await binance.futuresMarketBuy(symbol, amount, { type: "STOP_MARKET", positionSide: "short", stopPrice: middle, closePosition: true }))
        }

        // Hedge Mode, Long, work in progress:
        if (side == "longHedge") {
            // L O N G :
            // ------------------> to do: add an if statement to see if there's any open poisition and if there are close them <----------------
            // cancel all open orders
            // console.info(await binance.futuresCancelAll(symbol))
            // change leverage to 20x:
            console.info(await binance.futuresLeverage(symbol, 20));
            // go long:
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long" }))
            // set a stop:
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "long", type: "STOP_MARKET", stopPrice: stopPrice }))
            // set a take profit for long position:
            // console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "long", type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit, reduceOnly: true} ))

            // H E D G E :
            // increase leverage:
            console.info(await binance.futuresLeverage(symbol, hedgeLeverage));
            // open a small, highly leveraged short
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "short" }))
            // set a stop:
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "short", type: "STOP_MARKET", stopPrice: middle }))
            // the take profit price is the same as the stop price:
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "short", type: "TAKE_PROFIT_MARKET", stopPrice: stopPrice }))
        }

        // Hedge Mode, Short, work in progress:
        if (side == "shortHedge") {
            // S H O R T :
            // cancel all open orders:
            // console.info(await binance.futuresCancelAll("BTCUSDT"))
            // change leverage to 20x:
            console.info(await binance.futuresLeverage(symbol, 20));
            // open a short position:
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "short" }))
            // set a stop:
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "short", type: "STOP_MARKET", stopPrice: stopPrice }))
            // set a take profit for short
            // console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long", type: "TAKE_PROFIT_MARKET", stopPrice: takeProfit } ))

            // H E D G E :
            // increase leverage:
            console.info(await binance.futuresLeverage(symbol, hedgeLeverage));
            // open a small, highly leveraged short:
            console.info(await binance.futuresMarketBuy(symbol, amount, { positionSide: "long" }))
            // set a stop:
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "long", type: "STOP_MARKET", stopPrice: middle }))
            // the take profit price is the same as the stop price:
            console.info(await binance.futuresMarketSell(symbol, amount, { positionSide: "long", type: "TAKE_PROFIT_MARKET", stopPrice: stopPrice }))
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

        // Pairs with bbHedge.pine, experimental
        if (side == "bbHedge") {
            let orders = [
                {
                    symbol: "BTCUSDT",
                    side: "BUY",
                    type: "MARKET",
                    quantity: "0.001",
                    positionSide: "LONG"
                },
                {
                    symbol: "BTCUSDT",
                    side: "SELL",
                    type: "MARKET",
                    quantity: "0.001",
                    positionSide: "SHORT"
                },
                {
                    symbol: "BTCUSDT",
                    side: "BUY",
                    type: "STOP_MARKET",
                    quantity: "0.001",
                    positionSide: "LONG",
                    stopPrice: stopPrice
                },
                {
                    symbol: "BTCUSDT",
                    side: "SELL",
                    type: "STOP_MARKET",
                    quantity: "0.001",
                    positionSide: "SHORT",
                    stopPrice: stopPrice
                }
            ]
            console.info(await binance.futuresMultipleOrders(orders));
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
