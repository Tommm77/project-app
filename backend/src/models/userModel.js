const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String},
    lastname: { type: String},
    avatarUrl: { type: String },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;