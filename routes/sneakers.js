const express = require('express');
const { NotExtended } = require('http-errors');
const router = new express.Router();
const Sneaker = require('../models/Sneaker');
const Tags = require('../models/Tags');
const protectPrivateRoute = require('../middlewares/protectPrivateRoute')


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

router.get("/prod-add", protectPrivateRoute, (req, res) => {

    Tags.find()
        .then(tags => {
            console.log(tags)

            res.render("products_add", {
                tags: tags
            })
        })
        .catch(e => console.log(e))
});


router.post("/prod-add", protectPrivateRoute,  (req, res) => {

    Sneaker.findOne({
            ref: req.body.ref
        })
        .then((sneaker) => {
                if (sneaker) {
                    Tags.find()
                        .then(tags => {
                            console.log(tags)

                            res.render("products_add", {
                                tags: tags,
                                msg: {
                                    status: "product exists",
                                    txt: "product already exists"
                                }
                            })
                        })
                        .catch(e => console.log(e))

                } else {
                    console.log(req.body);
                    Sneaker.create(req.body)
                        .then(sneaker => res.send(sneaker))
                        .catch(e => console.log(e))
                }
            }

        )
        .catch(e => console.log(e))

});

router.post("/tag-add",protectPrivateRoute,  (req, res) => {

    Tags.findOne({
            label: req.body.label
        })
        .then((tag) => {
                if (tag) {
                    console.log("error tag exists")
                    Tags.find()
                        .then(tags => {
                            res.render("products_add", {
                                tags: tags,
                                msg: {
                                    status: "tagexists",
                                    txt: "tag already exists"
                                }
                            })
                        })
                        .catch(e => console.log(e))

                } else {
                    console.log(req.body);
                    Tags.create(req.body)
                        .then(tag => res.send(tag))
                        .catch(e => console.log(e))
                }
            }

        )
        .catch(e => console.log(e))

});

router.get("/prod-manage",protectPrivateRoute, (req, res) => {

    Tags.find()
        .then(tags => {
            res.render("product_edit", {
                tags: tags
            })
        })
        .catch(e => console.log(e))

});

router.post("/prod-manage/",protectPrivateRoute, (req, res) => {
    console.log(req.body);

    Sneaker.findOneAndUpdate({
            ref: req.body.ref
        }, req.body)
        .then(data => {
            if(data === null) {
                console.log("product does not exist" + data)
                Tags.find()
                .then(tags => {
                    res.render("product_edit", {
                        tags: tags,
                        msg: {
                            status: "productNotExits",
                            txt: "Product does not exist"
                        }
                    })
                })
                .catch(e => console.log(e))
            }
            else {
                console.log("product updated" + data)
                Tags.find()
                .then(tags => {
                    res.render("product_edit", {
                        tags: tags
                    })
                })
                .catch(e => console.log(e))
        
            }
        })
        .catch(e => console.log(e))

})

module.exports = router;
