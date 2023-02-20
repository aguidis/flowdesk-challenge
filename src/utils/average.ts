function computeAverage(values: number[]): number {
    const total = values.reduce((a, b) => a + b, 0)
    const averagePrice = total / values.length

    return +averagePrice.toFixed(2)
}

export { computeAverage }
