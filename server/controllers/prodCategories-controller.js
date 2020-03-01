const express = require("express");
const prodCategoriesLogic = require("../bll/prodCategories-logic");

const router = express.Router();


//get all  product categories from DB
router.get("/", async (req,res)=>{
    try{
        const prodCategories = await prodCategoriesLogic.getAllProdCategories();
        res.json(prodCategories)      
    }
    catch(err){
        res.status(500).send(err.message)
    }
});

module.exports=router;