const express = require("express");
const ordersLogic= require("../bll/orders-logic")

const router = express.Router();


//add order to DB
router.post("/", async (req, res) => {
  
    try {
        const addedOrder = await ordersLogic.addOrder(req.body);
        return res.status(200).json(addedOrder);
    }
    catch (err) { res.status(500).send(err.message) }

});


module.exports = router;    
