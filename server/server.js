const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { createTokens, validateToken } = require("./jwt")
const cors = require('cors')
require('dotenv').config()

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: [`${process.env.EDITOR_CLIENT_URL}`, `${process.env.CLIENT_URL}`]}))
app.use(express.json())
app.use(cookieParser())

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongo connection error"));
db.on("open", console.log.bind(console, "Mongo connection opened"));

const apiRouter = require('./routes/api')

app.use('/', apiRouter)

const PORT = process.env.PORT && 5000

app.listen(PORT, () => console.log(`server running on ${PORT}`))