const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())

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

app.post('/api/login', (req, res) => {
    const user = User.findOne()
    console.log(user)
    if (req.body.username !== 'admin') {
        return 'username is wrong' 
    } else {
        if (req.body.password !== 'adminpassword') {
            return 'password is wrong'
        } else {
            // correct login
            const user = {
                id: 1,
                username: 'admin',
                password: 'adminpassword'
            }
            jwt.sign({user}, 'secretkey', (err, token) => {
                res.json({
                    token
                })
            })
        }
    }
})

app.get('/api/posts', async (req, res) => {
    const messages = await Post.find().sort([["date", "descending"]]).populate("user")
    res.json(messages)
})

app.post('/api/posts', async (req, res) => {
    const post = await new Post({
        title: req.body.title,
        message: req.body.message,
        user: "codingAres",
        date: Date.now(),
        comments: []
    }).save()
    res.redirect(process.env.CLIENT_URL)
})

app.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            return console.log(err)
        } else {
            return res.json(post)
        }
    })
})

app.delete('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.redirect(process.env.CLIENT_URL)
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/comment/:id', (req, res) => {
    Comment.findById(req.params.id, function (err, post) {
        if (err) {
            return console.log(err)
        } else {
            return res.json(post)
        }
    })
})

app.post('/api/comment', async (req, res) => {
    try {
        const comment = await new Comment({
            title: req.body.name,
            message: req.body.comment,
            date: Date.now()
        }).save()
        const result = await Post.updateOne(
            {_id: req.body.postid },
            { $push: { comments: comment.id}} 
        )   
        res.redirect(process.env.CLIENT_URL)
    } catch (err) {
        console.log(err)
    }
})

app.delete('/api/comment/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        const commentInPost = await Post.updateOne(
            { _id: req.body.postid }, 
            { $pull: { comments: req.params.id }
        })
        res.redirect(process.env.CLIENT_URL)
    } catch (err) {
        console.log(err)
    }
})

app.listen(5000, () => console.log('server running on port 5000'))