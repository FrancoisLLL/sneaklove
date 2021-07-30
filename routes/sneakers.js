const express = require("express");
const router = new express.Router();
const Sneaker = require('../models/Sneaker')
const Tags = require('../models/Tags')
const protectPrivateRoute = require('../middlewares/protectPrivateRoute')
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
        const sneakersToDisplay = await Sneaker.find({
            category: cat
        })
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