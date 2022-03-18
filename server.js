import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/connect.js'
import 'express-async-errors'
import notFoundMiddleware from './middlware/not-found.js'
import errorHandlerMiddleware from './middlware/error-handler.js'
import authRouter from './routes/authRoutes.js' 
import channelsRouter from './routes/channelsRoutes.js'
import searchRouter from './routes/searchRoutes.js'
import morgan from 'morgan'
import authenticateUser from './middlware/auth.js'

const app = express()
dotenv.config()

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
  }

console.log("Hello.")

// middleware

app.get('/api/v1', (req, res) => {
    // throw new Error('Err-to-the-rerror')
    res.send({mdg: 'Welcome!'})
})

app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/jobs', authenticateUser, jobsRouter)
app.use('/api/v1/channels', authenticateUser, channelsRouter)
app.use('/api/v1/search', searchRouter)

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.hrml'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000



const start = async () => {

    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    }catch(error){
        console.log(error)
    }
} 

start()