const { createTokens } = require('../jwt')
const imageKit = require('imagekit')

const imagekit = new imageKit({
    urlEndpoint: 'https://ik.imagekit.io/hqpb7y53n',
    publicKey: process.env.imagekit_public_key,
    privateKey: process.env.imagekit_private_key
})

exports.authCheck = (req, res) => {
    res.json({ auth: true })
}

exports.IKauth = (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
}

exports.login = (req, res) => {
    try {
        const { username, password } = req.body
        if (username !== 'admin') {
            return res.json({ error: "User does not exist"})
        } else {
            if (password !== 'admin') return res.send({ error: "wrong password"})
            const user = { id: 1, username: "admin", password: "admin" }

            const accessToken = createTokens(user)
            
            res.json([accessToken])
        }
    } catch (err) {
        console.log(err)
    }
}

exports.logout = (req, res) => {
    res.cookie('access-token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({ success: true, message: 'User logged out'})
}