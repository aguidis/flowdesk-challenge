import app from '~/app'
import 'dotenv/config'

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('listening on port', process.env.EXPRESS_PORT)
})
