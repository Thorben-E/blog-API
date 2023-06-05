const { Post, Comment } = require('../db')

exports.get_comment = (req, res) => {
    Comment.findById(req.params.id, function (err, post) {
        if (err) {
            return console.log(err)
        } else {
            return res.json(post)
        }
    })
}

exports.post_comment = async (req, res) => {
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
}

exports.delete_comment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        const commentInPost = await Post.updateOne(
            { _id: req.body.postid }, 
            { $pull: { comments: req.params.id }
        })
        await res.json({ comment_deleted: true })
    } catch (err) {
        console.log(err)
    }
}