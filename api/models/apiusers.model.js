const mongoose = require('mongoose');

const ApiUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    projectName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const ApiUser = mongoose.model('ApiUser', ApiUserSchema);

module.exports = ApiUser;
