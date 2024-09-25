const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
    try{let { name, price, discount, bgcolor, panelcolor, textcolor } =
        req.body;

        if(!req.file){
            return req.status(400).send("No image file uploadeed");
        }

    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });

    req.flash("success", "Product created successfully.");
    res.redirect("/owners/admin");}
    catch(err){
        res.send(err.message);
        res.send(500).send(err.message);
    }
});

module.exports = router;
