import Binance from 'binance-api-node'
import { computeGlobalPriceIndex } from '~/utils/order-book-helper'

const binance = Binance()

async function getPriceIndex(pair: string): Promise<number> {
    const pairOrderBook = await binance.book({ symbol: pair })

    console.log('pairOrderBook', pairOrderBook)

    const bestBid = Number(pairOrderBook.bids[0].price)
    const bestAsk = Number(pairOrderBook.asks[0].price)

    return computeGlobalPriceIndex(bestBid, bestAsk)
}

export { getPriceIndex }
