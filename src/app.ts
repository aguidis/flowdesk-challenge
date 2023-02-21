import express from 'express'
import indexRouter from '~/routes/index'
import orderBookRouter from '~/routes/order-book'

const app = express()

app.use('/', indexRouter).use('/order-book', orderBookRouter)

export default app
