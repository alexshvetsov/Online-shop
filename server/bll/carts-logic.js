const Cart = require('../models/cart-model');


//get one cart from DB
function getOneCart(userId){
    return new Promise((resolve,reject)=>{
        Cart.find({user: userId, active:true},(err,cart)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(cart)
        })
    })
} 

//add cart to DB
function addCart(cart) {
    return new Promise((resolve, reject) => {
        let addedCart = new Cart(cart);
        addedCart.save((err, info) => {
            if (err) { return rej(err) }
            resolve(info);
        });
    });
}

//update existing cart in DB
function upadteCart(cart){
    return new Promise((resolve,reject)=>{
        const newCart = new Cart(cart);
        Cart.updateOne({_id:newCart._id},newCart,(err,info)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(info)
        });
    });
}

module.exports = {
    addCart,
    upadteCart,
    getOneCart
}   