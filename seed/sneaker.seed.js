require("dotenv").config();
const mongoose = require("mongoose");
require('../config/mongodb')
const Sneaker = require('../models/Sneaker')
const Tags = require('../models/Tags')


const sneakersSeed = [{
        name: 'Nike',
        ref: 'Airmax',
        size: 42,
        description: 'Best shoes you can get',
        price: 200,
        category: ['men', 'women'],
        id_tag: ["Running", "Basket"]
    },
    {
        name: 'Reebok',
        ref: 'Classic',
        size: 68,
        description: 'Classic shoes',
        price: 42,
        category: ['women'],
        id_tag: ["Casual"]

    },
    {
        name: 'Crocs',
        ref: 'Comfy shoes',
        size: 20,
        description: 'Plastic shoes',
        price: 5,
        category: ['kids'],
        id_tag: ["Casual"]
    },
]

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {

        insert();

    })
    .catch(e => console.log(e))

function insert() {
    sneakersSeed.forEach((sneaker, index, array) => {
        for (let i = 0; i < sneaker.id_tag.length; i++) {
            Tags.findOne({
                    label: sneaker.id_tag[i]
                })
                .then(tagFound => {
                    sneaker.id_tag[i] = tagFound._id;
                    if (i === sneaker.id_tag.length-1) {
                        Sneaker.create(sneaker)
                            .then((data) => console.log("data created: " + data))
                            .catch(e => console.log(e))
                    }
                })
                .catch(e => console.log(e))
        }
    })
}


mongoose.connection.on("connected", () => console.log("yay mongodb connected :)"));

mongoose.connection.on("error", () => console.log("nay db error sorry :("));