import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import useRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { errhander } from './middleware/error.middleware.js'
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('MongoDB connection error:', err)
})
const app = express()

app.use('/api/user',useRouter)
app.use(express.json())
app.use('/api/auth',authRouter)

app.use(errhander)
app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})
