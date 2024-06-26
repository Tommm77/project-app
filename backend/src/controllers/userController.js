const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().exec()
        return !users
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN RETRIEVE ALL USERS '})
            :
            res.status(200).json({statusCode: 200, message: users})
    } catch (e) {
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id).exec()
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR in getby id '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        ;
        const user = await userModel.create({
            username,
            email,
            password,
        });

        return !user
            ?
            res.status(400).json({ statusCode: 400, message: 'ERROR IN CREATE NEW USER ' })
            :
            res.status(201).json({ statusCode: 201, message: user });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ statusCode: 400, message: e.message });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, firstname, lastname, password, avatarUrl } = req.body;

    try {
        let hashedPassword = password;

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            username,
            email,
            firstname,
            lastname,
            password: hashedPassword,
            avatarUrl
        }, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const user = await userModel.findByIdAndDelete(id)
        console.log(user)
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN DELETE USER '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}