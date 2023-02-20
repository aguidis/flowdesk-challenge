import { Kraken } from 'node-kraken-api'
import { computeAverage } from '~/utils/average'

const kraken = new Kraken()

async function getPriceIndex(pair: string): Promise<number> {
    if (pair.includes('BTC')) {
        pair = pair.replace('BTC', 'XBT')
    }

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

    return computeAverage([bestBid, bestAsk])
}

export { getPriceIndex }
