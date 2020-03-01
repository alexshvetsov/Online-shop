const express = require("express");
const cartsLogic= require("../bll/carts-logic")

const router = express.Router();


//get active cart buy userID
router.get("/:userID", async (request, response) => {
    const userId = request.params.userID;
    const cart = await cartsLogic.getOneCart(userId);
    if(cart.length>0){
        response.json(cart[0]);
    }
    else{
        response.json('no cart');
    }
 
});

//add cart to DB
router.post("/", async (req, res) => {
    try {
        const addedCart = await cartsLogic.addCart(req.body);
        return res.status(200).json(addedCart);
    }
    catch (err) { res.status(500).send(err.message) }

});


//update existing cart in DB
router.put("/:_id", async (request, response) => {
    const _id = request.params._id;
    const cart = request.body;
    cart._id = _id
    const updatedCart = await cartsLogic.upadteCart(cart);
    response.json(updatedCart);
});

module.exports = router;    
