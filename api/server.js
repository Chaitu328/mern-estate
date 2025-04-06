import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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

app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})
