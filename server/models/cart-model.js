const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    totalPrice:Number,
    active: Boolean,
    cartProducts:[{
        name:String,
        product:String,
        quantity:Number,
        price:Number
    }]
}, { versionKey: false });

const Cart = mongoose.model("Cart", cartSchema, "carts")

module.exports = Cart;



