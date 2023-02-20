import { WebSocket } from 'ws'
import { computeGlobalPriceIndex } from '~/utils/order-book-helper'

const ws = new WebSocket('wss://api.huobi.pro/ws')

interface MarketDepthMessage {
    ch: string
    ts: number
    tick: {
        bids: Array<[number, number]>
        asks: Array<[number, number]>
        ts: number
        version: number
    }
}

async function getPriceIndex(symbol: string): Promise<number> {
    const channel = `market.${symbol.toLowerCase()}.bbo`

    return await new Promise((resolve, reject) => {
        ws.on('open', () => {
            console.log(`Websocket connected: ${channel}`)
            const req = {
                sub: channel,
                id: `${channel}-id`,
            }
            ws.send(JSON.stringify(req))
        })

        ws.on('message', data => {
            console.log('WS data: ', data.toString())
            const message: MarketDepthMessage | null = JSON.parse(data.toString())
            if (message !== null && message.ch === channel) {
                const bbo = message.tick
                console.log(`Best bid: ${bbo.bids[0][0]}, Best ask: ${bbo.asks[0][0]}`)

                const priceIndex = computeGlobalPriceIndex(bbo.bids[0][0], bbo.asks[0][0])

                console.log(`Price index: ${priceIndex}`)

                ws.close()
                resolve(priceIndex)
            }
        })

        ws.on('error', (error: Error) => {
            console.error(`Websocket error: ${error.message}`)
            reject(error)
        })

        ws.on('close', () => {
            console.log(`Websocket disconnected: ${channel}`)
        })
    })
}

export { getPriceIndex }
