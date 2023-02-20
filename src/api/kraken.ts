import { Kraken } from 'node-kraken-api'
import { computeGlobalPriceIndex } from '~/utils/order-book-helper'

const kraken = new Kraken()

async function getPriceIndex(pair: string): Promise<number> {
    const pairOrderBook = (await kraken.depth({ pair }))[pair]

    if (
        pairOrderBook.bids === null ||
        pairOrderBook.asks === null ||
        pairOrderBook.bids === undefined ||
        pairOrderBook.asks === undefined
    ) {
        throw new Error(`Unable to retrieve order book for ${pair}`)
    }

    const bestBid = Number(pairOrderBook.bids[0][0])
    const bestAsk = Number(pairOrderBook.asks[0][0])

    return computeGlobalPriceIndex(bestBid, bestAsk)
}

export { getPriceIndex }
