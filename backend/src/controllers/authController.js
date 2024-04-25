require("dotenv").config()
const bcrypt = require('bcryptjs');

const passport = require('passport'),
    userModel = require('../models/userModel');
const {generateToken} = require("../utils/bcrypt");


exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hachage du mot de passe avant de créer l'utilisateur
        const salt = await bcrypt.genSalt(10); // Générer le salt (10 tours est généralement suffisant pour un bon équilibre entre sécurité et performance)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création de l'utilisateur avec le mot de passe haché
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword, // Utilisez le mot de passe haché ici
        });

        // Gestion de la réponse
        console.log('user :', user)
        return !user
            ? res.status(400).json({ statusCode: 400, message: 'ERROR IN CREATE NEW USER' })
            : res.status(200).json({ statusCode: 201, message: user });

    } catch (e) {
        console.log(e);
        return res.status(400).json({ statusCode: 400, message: e.message });
    }
};

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
                token: `Bearer ${
                    generateToken({
                        _id: user.id,
                        username: user.username,
                    })
                }`}
        })
    })(req, res, next)
}