const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const convSchema = new mongoose.Schema({
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: false
    }],
    name: { type: String, required: true },
});