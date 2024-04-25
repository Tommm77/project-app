require("dotenv").config()

const passport = require('passport'),
    userModel = require('../models/userModel');


exports.signUp = async (req, res) => {
    try {
        // create(req, res)
        const {username, email, password} = req.body
        console.log("req.body", req.body)
        const user = await userModel.create({
            username,
            email,
            password,
        })
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN CREATE NEW USER '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}
exports.login = async (req, res, next) => {
    console.log('login')
    passport.authenticate('local', {session: false}, async (err, user, info) => {
        console.log("err", err)
        console.log("info", info)
        console.log("user", user)
        if (err) return res.status(400).json({statusCode: 400, message: err.message})
        if (!user) return res.status(422).json({statusCode: 422, message: info})
        return res.status(200).json({
            statusCode: 200,
            message: {
                user: await user,
         }
        })
    })(req, res, next)
}