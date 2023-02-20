import Binance from 'binance-api-node'
import { computeAverage } from '~/utils/average'

const binance = Binance()

async function getPriceIndex(pair: string): Promise<number> {
    const pairOrderBook = await binance.book({ symbol: pair })

    const bestBid = Number(pairOrderBook.bids[0].price)
    const bestAsk = Number(pairOrderBook.asks[0].price)

    return computeAverage([bestBid, bestAsk])
}

export { getPriceIndex }
