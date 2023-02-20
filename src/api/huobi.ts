import { WebSocket } from 'ws'
import * as zlib from 'zlib'
import { computeAverage } from '~/utils/average'
import { type BestAskBidMessage } from '~/types/huobi/BestAskBidMessage'

async function getPriceIndex(symbol: string): Promise<number> {
    const ws = new WebSocket('wss://api.huobi.pro/ws')
    const channel = `market.${symbol.toLowerCase()}.bbo`

    return await new Promise((resolve, reject) => {
        ws.on('open', () => {
            const req = {
                sub: channel,
                id: `${channel}-id`,
            }
            ws.send(JSON.stringify(req))
        })

        ws.on('message', async data => {
            const message: BestAskBidMessage | undefined = await new Promise(resolve => {
                zlib.unzip(data, (error: Error | null, buffer) => {
                    if (error != null) {
                        reject(error)
                    }
                    const json = JSON.parse(buffer.toString())
                    resolve(json)
                })
            })

            if (message !== null && message !== undefined && message.ch === channel) {
                const priceIndex = computeAverage([message.tick.bid, message.tick.ask])

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
