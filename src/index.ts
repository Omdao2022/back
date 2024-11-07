import express, { Express, Request, Response, Application } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import kycRouter from './routes/kycRouter'
import cors from 'cors'

//For env file
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(
    cors({
        origin: 'http://localhost:3000', // Your frontend URL
        credentials: true, // Allow credentials
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', kycRouter)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`)
    })
    console.log('Env', process.env.SUMSUB_SECRET, process.env.SUMSUB_TOKEN)
})
