const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagModel = new Schema ({
    label: {
        type: String,
        unique: true
    }
    })

const Tags = mongoose.model('tag', tagModel)

module.exports = Tags

