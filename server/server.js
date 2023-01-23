const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// parse application/json
app.use(bodyParser.json())

const { User, Post, Comment } = require('./db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongo connection error"));
db.on("open", console.log.bind(console, "Mongo connection opened"));

app.get('/api', (req, res) => {
    res.json({'users': ['userOne', 'userTwo', 'userThree']})
});

app.get('/api/posts', async (req, res) => {
    const messages = await Post.find().sort([["date", "descending"]]).populate("user")
    res.json(messages)
})

app.get('/api/posts/:id', (req, res) => {
    const data = Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err)
        } else {
            return post
        }
    })
    res.send(data)
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'username',
        password: 'password'
    }
});

app.post('/api/create', async (req, res) => {
    const post = await new Post({
        title: req.body.title,
        message: req.body.message,
        user: "codingAres",
        date: Date.now(),
        comments: []
    }).save()
    res.redirect(process.env.CLIENT_URL)
})

app.listen(5000, () => console.log('server running on port 5000'))