import express from 'express'
import * as routes from '~/controllers/orderBook'

const router = express.Router()

router.get('/:pair/global-price-index', routes.pairGlobalPriceIndex)

export default router
