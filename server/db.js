const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.model(
    "User",
    new Schema({
        username: { type: String, required: true },
        password: { type: String, required: true }
    })
);

const Post = mongoose.model(
    "Post",
    new Schema({
        title: { type: String, required: true },
        message: { type: String, required: true },
        img: { type: String },
        user: { type: String, required: true },
        date: { type: Date, required: true },
        comments: { type: Array, required: true }
    })
)

const Comment = mongoose.model(
    "Comment",
    new Schema({
        title: { type: String, required: true },
        message: { type: String, required: true},
        date: { type: Date, required: true }
    })
)

module.exports = { User, Post, Comment }