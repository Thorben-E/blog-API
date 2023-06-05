const express = require("express");
const { validateToken } = require("../jwt")
const auth_controller = require('../controllers/authController')
const post_controller = require('../controllers/postController')
const comment_controller = require('../controllers/commentController')
const router = express.Router()

router.get('/', validateToken, (req, res) => res.json({ message: 'Server is online'}))

router.get('/IKauth', auth_controller.IKauth)

router.post('/api/checkAuth', validateToken, auth_controller.authCheck)

router.post('/api/login', auth_controller.login)

router.post('/api/logout', auth_controller.logout)

router.get('/api/posts', post_controller.get_posts)

router.post('/api/posts',validateToken, post_controller.post_posts)

router.get('/api/posts/:id', post_controller.get_posts_id)

router.put('/api/posts/:id',validateToken, post_controller.put_posts_id)

router.delete('/api/posts/:id',validateToken, post_controller.delete_posts_id)

router.get('/api/comment/:id', comment_controller.get_comment)

router.post('/api/comment', comment_controller.post_comment)

router.delete('/api/comment/:id',validateToken, comment_controller.delete_comment)

module.exports = router