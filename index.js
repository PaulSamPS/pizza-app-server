require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const path = require('path')
const {createServer} = require("http");
const connectDb = require("./db");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', true)

const app = express()
const httpServer = createServer(app)
app.use( cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await connectDb()
        httpServer.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

