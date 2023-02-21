import { type Request, type Response } from 'express'
import asyncHandler from 'express-async-handler'
import { computeAverage } from '~/utils/average'
import { getPriceIndex as fetchKrakenPriceIndex } from '~/api/kraken'
import { getPriceIndex as fetchBinancePriceIndex } from '~/api/binance'
import { getPriceIndex as fetchHuobiPriceIndex } from '~/api/huobi'
import { isFulfilled, isRejected } from '~/helper/promise'

const pairGlobalPriceIndex = asyncHandler(async (_request: Request, response: Response) => {
    const pair = _request.params.pair

    const [prices, rejectedReasons] = await getGlobalPriceIndex(pair)

    response.send({
        indexPrice: computeAverage(prices),
        errors: rejectedReasons,
    })
})

async function getGlobalPriceIndex(pair): Promise<[number[], string[]]> {
    const krakenPriceIndex = fetchKrakenPriceIndex(pair)
    const binancePriceIndex = fetchBinancePriceIndex(pair)
    const huobiPriceIndex = fetchHuobiPriceIndex(pair)

    const results = await Promise.allSettled([krakenPriceIndex, binancePriceIndex, huobiPriceIndex])

    const prices = results
        .filter(isFulfilled)
        .filter(response => isFulfilled(response) && response.value > 0)
        .map(({ value }) => value)

    const rejectedReasons = results.filter(isRejected).map(p => p.reason)

    return [prices, rejectedReasons]
}

export { pairGlobalPriceIndex }
