const { sign, verify } = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign(
        { id: user.id, username: user.username },
        process.env.SECRET_KEY
    )

    return accessToken
}

const validateToken = (req, res, next) => {
    let accessToken = req.body.token
    
    if (!accessToken) return res.status(400).json({ error: "User doesn't have a auth cookie"})

    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY)
        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

module.exports = { createTokens, validateToken }