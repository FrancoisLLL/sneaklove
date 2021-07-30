const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagModel = new Schema ({
    label: String
    })

const Tags = mongoose.model('tag', tagModel)

module.exports(Tags)

