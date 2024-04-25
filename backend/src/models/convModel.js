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
    name: { type: String, required: true },
});

const Conv = mongoose.model('Conv', convSchema);
module.exports = Conv;