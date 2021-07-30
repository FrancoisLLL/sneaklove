const express = require("express");
const router = new express.Router();

//////Sneakers
router.get("/sneakers/:cat", (req, res) => {
    console.log(req.params);
    Sneaker.find({
        category: req.params.cat
      })
      .then((foundSneakers) => {
        console.log(foundSneakers)
        res.render("index");
      })
      .catch(e => console.log(e))
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
  
  