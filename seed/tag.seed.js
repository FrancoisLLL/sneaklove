require("dotenv").config();

require('../config/mongodb')
const Tag = require('../models/Tags')

const tagseed = [{
        label: 'Running'
    },
    {
        label: 'Training'
    },
    {
        label: 'Casual'
    },
    {
        label: 'Basket'
    },
    {
        label: 'Football'
    },

]



const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        Tag.create(tagseed)
            .then((doc) => {
                console.log(doc.length)
            })
            .catch(e => console.log(e))
    })
    .catch(e => console.log(e))

mongoose.connection.on("connected", () => console.log("yay mongodb connected :)"));

mongoose.connection.on("error", () => console.log("nay db error sorry :("));