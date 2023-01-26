const { sign, verify } = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign(
        { id: user.id, username: user.username },
        process.env.SECRET_KEY
    )

    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]
    
    if (!accessToken) return res.status(400).json({ error: "user not authenticated"})

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