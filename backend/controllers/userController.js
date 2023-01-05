const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)

        const token = createToken(user._id)

        res.status(200).json({ username, token })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }

}

//signup user
const signupUser = async (req, res) => {
    const { name, phone, email, username, password } = req.body

    try {
        const user = await User.signup(name, phone, email, username, password)

        const token = createToken(user._id)

        res.status(200).json({ username, token })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }

}

module.exports = { loginUser, signupUser }