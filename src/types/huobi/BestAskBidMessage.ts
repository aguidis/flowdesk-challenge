interface BestAskBidMessage {
    ch: string
    ts: number
    tick: {
        seqId: number
        ask: number
        askSize: number
        bid: number
        bidSize: number
        quoteTime: number
        symbol: string
    }
}

export type { BestAskBidMessage }
