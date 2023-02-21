import express from 'express'
const router = express.Router()

router.get('/', function (_, res) {
    res.send({ message: 'Hello Flowdesk !' })
})

export default router
