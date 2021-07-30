const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sneakerModel = new Schema ({
    name: String,
    ref: {
        type: String,
        unique: true,
        required: true
    },
    size: Number,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['men', 'women', 'kids']
    }
    })

const Sneaker = mongoose.model('sneaker', sneakerModel)

module.exports(Sneaker)

