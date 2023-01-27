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

const { User, Post, Comment } = require('./db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongo connection error"));
db.on("open", console.log.bind(console, "Mongo connection opened"));

app.get('/api/posts', async (req, res) => {
    const messages = await Post.find().sort([["date", "descending"]]).populate("user")
    res.json(messages)
})

app.post('/api/login', (req, res) => {
    try {
        const { username, password } = req.body
        if (username !== 'admin') {
            return res.json({ error: "User does not exist"})
        } else {
            if (password !== 'admin') return res.send({ error: "wrong password"})
            const user = { id: 1, username: "admin", password: "admin" }

            const accessToken = createTokens(user)
            res.cookie("access-token", accessToken, {
                maxAge: 60*60*24*30*1000,
                httpOnly: true,
                secure: false
            })
            res.json("logged in")
        }
    } catch (err) {
        console.log(err)
    }
})

app.post('/api/posts', async (req, res) => {
    try {
        const post = await new Post({
            title: req.body.title,
            message: req.body.message,
            user: "codingAres",
            date: Date.now(),
            comments: []
        }).save()
        res.json({ message: 'Post created'})
    } catch (err) {
        res.json({ message: 'Posting post failed, try again', error: err })
    }
    
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

app.put('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            message: req.body.message,
            user: req.body.author
        })
        res.json({ message: 'Post updated'})
    } catch (err) {
        res.json({ message: 'Updating post failed, try again'})
    }
})

app.delete('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id) 
        res.json({ message: 'Post deleted'})
    } catch (err) {
        res.json({ message: 'Deleting post failed, try again'})
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
    } catch (err) {
        console.log(err)
    }
})

app.listen(5000, () => console.log('server running on port 5000'))