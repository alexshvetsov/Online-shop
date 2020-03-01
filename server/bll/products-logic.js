const Product = require('../models/product-model');
const prodCategory = require('../models/prodCategory-model');



//get all product from DB
function getAllProducts(){
    return new Promise((resolve,reject)=>{  
        Product.find({}).populate("prodCategory").exec((err,products)=>{           
            if(err) return reject(err);
            resolve(products);
        });
    });
};


//add product to DB
function addProduct(product) {
    return new Promise((resolve, reject) => {
        const productToAdd = new Product(product);
        productToAdd.save((err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}

//update existing product in DB
function upadteProduct(product) {
    return new Promise((resolve, reject) => {
        const productToUpdate = new Product(product);
        Product.updateOne({ _id: product._id }, productToUpdate, (err, info) => {
            if (err) return reject(err);
            resolve(info);        
        });
    });
}


module.exports={
    getAllProducts,
    upadteProduct,
    addProduct

}
