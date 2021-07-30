const mongoose = require('mongoose')
const Tag = require('../models/Tags')

const tagseed = [
    {
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

require('../config/mongodb')

Tag.create(tagseed)
    .then((doc) => {
        console.log(doc.length)
    })
    .catch(e => console.log(e))