require("dotenv").config();
const mongoose = require("mongoose");
require('../config/mongodb')
const User = require('../models/User')


const userSeed = [
    {
        name:'Bob',
        lastname: 'Doe',
        email: 'bobdoe@gmail.com',
        password: '1234azerty',
    },
    {
        name:'Alice',
        lastname: 'Doe',
        email: 'alicedoe@gmail.com',
        password: '1234',
    },
    {
        name:'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12rty',
    },
    {
        name:'Foo',
        lastname: 'Doe',
        email: 'foodoe@gmail.com',
        password: 'password',
    },
    
]

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    User.create(userSeed)
        .then((doc) => {
            console.log('User seed created: ', doc.length)
        })
        .catch(e => console.log(e))
})
.catch(e => console.log(e))

mongoose.connection.on("connected", () => console.log("yay mongodb connected :)"));

mongoose.connection.on("error", () => console.log("nay db error sorry :("));