import express, { type Request, type RequestHandler, type Response } from 'express'
import { getPriceIndex as fetchKrakenPriceIndex } from '~/api/kraken'
import { getPriceIndex as fetchBinancePriceIndex } from '~/api/binance'
import { getPriceIndex as fetchHuobiPriceIndex } from '~/api/huobi'
import { computeAverage } from '~/utils/average'
import { isFulfilled, isRejected } from '~/types/PromiseSettledState'

const app = express()

app.get('/order-book/:pair/global-price-index', (async (_request: Request, response: Response) => {
    const pair = _request.params.pair

    const krakenPriceIndex = fetchKrakenPriceIndex(pair)
    const binancePriceIndex = fetchBinancePriceIndex(pair)
    const huobiPriceIndex = fetchHuobiPriceIndex(pair)

    const results = await Promise.allSettled([krakenPriceIndex, binancePriceIndex, huobiPriceIndex])

    const prices = results
        .filter(isFulfilled)
        .filter(response => isFulfilled(response) && response.value > 0)
        .map(({ value }) => value)

    const rejectedReasons = results.filter(isRejected).map(p => p.reason)

    response.send({
        indexPrice: computeAverage(prices),
        errors: rejectedReasons,
    })
}) as RequestHandler)

export default app
