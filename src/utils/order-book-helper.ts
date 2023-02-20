function computeGlobalPriceIndex(bestBid: number, bestAsk: number): number {
    const averagePrice = (bestBid + bestAsk) / 2

    return +averagePrice.toFixed(2)
}

export { computeGlobalPriceIndex }
