const Sneaker = require("../models/Sneaker")

const sneakers = [{
        name: 'Nike',
        ref: 'Airmax',
        size: 42,
        description: ' Best shoes you can get',
        price: 200,
        category: ['men', 'women'],
        ojizfovjr
    },
    {
        name: 'Reebok',
        ref: 'Classic',
        size: 68,
        description: 'Classic shoes',
        price: 42,
        category: ['women'],


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

Sneaker.create(sneakers)
    .then(
        (sneakers) => sneakers.forEach((sneaker => {
            let idtag = sneaker.id_tag;

            Tag.findOne({
                    id_tag: idtag
                })
                .then(tag => Sneaker.findByIdAndUpdate(sneaker.id, {
                    id_tag: tag._id
                }))
                .catch(e => console.log(e))

        })))
    .catch(e => console.log(e))


    // 1) Ajouter les labels des tags dans la listes des sneakers à créer
    // 2) Faire une loop pour remplacer les labels par les objectifs ID (find)
    // 3) create

