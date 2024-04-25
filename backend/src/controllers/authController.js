require("dotenv").config()
const bcrypt = require('bcryptjs');

const passport = require('passport'),
    userModel = require('../models/userModel');


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
        return !user
            ? res.status(400).json({ statusCode: 400, message: 'ERROR IN CREATE NEW USER' })
            : res.status(200).json({ statusCode: 201, message: user });

    } catch (e) {
        console.log(e);
        return res.status(400).json({ statusCode: 400, message: e.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Recherche de l'utilisateur par son nom d'utilisateur
        const user = await userModel.findOne({ username });

        if (!user) {
            // Si aucun utilisateur n'est trouvé
            return res.status(404).json({ statusCode: 404, message: 'User not found' });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Si le mot de passe ne correspond pas
            return res.status(401).json({ statusCode: 401, message: 'Incorrect password' });
        }

        // L'utilisateur est authentifié, renvoyer les données de l'utilisateur
        return res.status(200).json({
            statusCode: 200,
            message: {
                user: user
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ statusCode: 500, message: e.message });
    }
};