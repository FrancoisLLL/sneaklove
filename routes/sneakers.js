const express = require("express");
const router = new express.Router();
const Sneaker = require('../models/Sneaker')
const Tags = require('../models/Tags')
//////Sneakers
router.get("/sneakers/:cat", async (req, res) => {
    // console.log(req.params);
    // Sneaker.find({
    //     category: req.params.cat
    //   })
    //   .then((foundSneakers) => {
    //     console.log(foundSneakers)
    //     res.render("index", {foundSneakers});
    //   })
    //   .catch(e => console.log(e))
    try {
      const cat = req.params.cat
      const sneakersToDisplay = await Sneaker.find({category: cat})
      const tags = await Tags.find()
      

    } catch (error) {
      console.log(error)
    }
  });
  
  router.get("/one-product/:id", (req, res) => {
    console.log(req.params);
    Sneaker.findById(
        req.params.id
      )
      .then((foundSneaker) => {
        console.log(foundSneaker)
        res.render("index");
      })
      .catch(e => console.log(e))
  });
  
  