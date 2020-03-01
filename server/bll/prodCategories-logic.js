const Product = require('../models/product-model');
const ProdCategory = require('../models/prodCategory-model');


//get all product category from DB
function getAllProdCategories(){
    return new Promise((resolve,reject)=>{
        ProdCategory.find({}, (err, prodCategories) => {
            if (err) return reject(err);
            resolve(prodCategories);
        });
    });
};


module.exports={
    getAllProdCategories,

}