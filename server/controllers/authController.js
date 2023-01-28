exports.authCheck = (req, res) => {
    res.json({ auth: true })
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
}

exports.logout = (req, res) => {
    res.cookie('access-token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({ success: true, message: 'User logged out'})
}