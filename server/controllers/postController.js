const { Post } = require('../db')

exports.get_posts = async (req, res, next) => {
    try {
        const messages = await Post.find().sort([["date", "descending"]]).populate("user")
        res.json(messages)
    } catch (err) {
        next(err)
    }
}

exports.post_posts = async (req, res) => {
    try {
        const post = await new Post({
            title: req.body.title,
            message: req.body.message,
            img: req.body.img,
            user: "codingAres",
            date: Date.now(),
            comments: []
        }).save()
        res.json({ message: 'Post created'})
    } catch (err) {
        res.json({ message: 'Posting post failed, try again', error: err })
    }
}

exports.get_posts_id = (req, res) => {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            return console.log(err)
        } else {
            return res.json(post)
        }
    })
}

exports.put_posts_id = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            img: req.body.img,
            title: req.body.title,
            message: req.body.message,
            user: req.body.author
        })
        res.json({ message: 'Post updated'})
    } catch (err) {
        res.json({ message: 'Updating post failed, try again'})
    }
}

exports.delete_posts_id = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id) 
        res.json({ message: 'Post deleted'})
    } catch (err) {
        res.json({ message: 'Deleting post failed, try again'})
    }
}