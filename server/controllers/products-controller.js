const express = require("express");
const productsLogic = require("../bll/products-logic");

const router = express.Router();


//get all products from DB

router.get("/", async (req,res)=>{
    try{
        const products = await productsLogic.getAllProducts();
        res.json(products)      
    }
    catch(err){
        res.status(500).send(err.message)
    }
});

//add product to DB
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const addedProduct = await productsLogic.addProduct(newProduct);
        return res.status(200).json(addedProduct);
    }
    catch (err) { res.status(500).send(err.message) }
});

//update existing product in DB
router.put('/', async (req, res) => {
    try {
        const product = req.body;
        const updatedProduct = await productsLogic.upadteProduct(product);
        return res.status(200).json(updatedProduct);
    }
    catch (err) { res.status(500).send(err.message) }
});


module.exports=router;