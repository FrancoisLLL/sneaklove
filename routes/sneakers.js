const express = require('express');
const { NotExtended } = require('http-errors');
const router = new express.Router();
const Sneaker = require('../models/Sneaker');
const Tags = require('../models/Tags');

//////Sneakers

router.get('/sneakers/:cat', async (req, res, next) => {
  const tags = await Tags.find();
  try {
    const category = req.params.cat;
    if (category === 'collection') {
      const sneakers = await Sneaker.find();
      res.render('products', { sneakers, tags });
      return;
    } else {
      const sneakers = await Sneaker.find({ category: category })
        .populate('id_tag').exec();
      
      console.log(sneakers)
      const includeTags = new Set()
      sneakers.forEach((sneaker) => {
        sneaker.id_tag.forEach( tag => {
          includeTags.add(tag.toString())
        })
        
      });
      console.log(includeTags)
      Array.from(includeTags)
      console.log(includeTags)
      res.render('products', {
        sneakers: sneakers
      });
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/one-product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const sneaker = await Sneaker.findById(productId);
    res.render('one_product', {
      sneaker,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
