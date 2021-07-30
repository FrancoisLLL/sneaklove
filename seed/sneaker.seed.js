require("dotenv").config();
const mongoose = require("mongoose");
require('../config/mongodb')
const Sneaker = require('../models/Sneaker')


const sneakersSeed = [
    {
        name:'Nike' ,
        ref: 'Airmax',
        size: 42,
        description: 'Best shoes you can get',
        price: 200,
        category: ['men', 'women'],
        id_tag: 'running'
    },
    {
        name: 'Reebok',
        ref: 'Classic',
        size: 68,
        description: 'Classic shoes',
        price: 42,
        category: ['women'],
        id_tag: 'casual'
        
    },
    {
        name: 'Crocs',
        ref: 'Comfy shoes',
        size: 20,
        description: 'Plastic shoes',
        price: 5,
        category: ['kids'],
    },
]

sneakersSeed.forEach(sneaker => {

})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    // Sneaker.create(sneakseed).populate('id_tag')
    //     .then((doc) => {
    //         console.log('Sneaker seed created: ', doc.length)
    //     })
    //     .catch(e => console.log(e))
    Sneaker.create(sneakersSeed)
    .then(sneakers => sneakers.forEach(sneaker => {
            let idtag = sneaker.id_tag;
            Tag.findOne({
                    id_tag: idtag
                })
                .then(tag => Sneaker.findByIdAndUpdate(sneaker.id, {
                    id_tag: tag._id
                }))
                .catch(e => console.log(e))
        }))
    .catch(e => console.log(e))


})
.catch(e => console.log(e))

mongoose.connection.on("connected", () => console.log("yay mongodb connected :)"));

mongoose.connection.on("error", () => console.log("nay db error sorry :("));





    // 1) Ajouter les labels des tags dans la listes des sneakers à créer
    // 2) Faire une loop pour remplacer les labels par les objectifs ID (find)
    // 3) create
