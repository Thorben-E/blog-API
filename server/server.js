const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

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

app.post('/api/editor', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Welcome Editor",
                authData
            });
        }
    })
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'username',
        password: 'password'
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({ token })
    });
});

app.post('/api/create', (req, res) => {
    const post = new Post({
        title: req.body.title,
        message: req.body.message,
        user: 1,
        date: Date.now(),
        comments: []
    }).save()
    res.redirect('/')
})

// Verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('server running on port 5000'))