const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema ({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: String
    })

const User = mongoose.model('user', userModel)

module.exports = User