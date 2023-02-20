import express, { type Request, type RequestHandler, type Response } from 'express'
import { getPriceIndex as fetchKrakenPriceIndex } from '~/api/kraken'
import { getPriceIndex as fetchBinancePriceIndex } from '~/api/binance'
import { getPriceIndex as fetchHuobiPriceIndex } from '~/api/huobi'

const app = express()

app.get('/', (async (_request: Request, response: Response) => {
    //const krakenPriceIndex = fetchKrakenPriceIndex('XBTUSDT')
    //const binancePriceIndex = fetchBinancePriceIndex('BTCUSDT')
    const huobiPriceIndex = fetchHuobiPriceIndex('BTCUSDT')

    const results = await Promise.allSettled([huobiPriceIndex])

    console.log(results)

    response.send(results)
}) as RequestHandler)

export default app
