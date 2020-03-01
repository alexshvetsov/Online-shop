const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cart: { type: mongoose.Schema.Types.Mixed, ref: 'Cart' },
    address: { type: mongoose.Schema.Types.Mixed, ref: 'Address' },
    orderDate: Date,
    cc: { 
        number: String,
        expiration: { month: String, year: String },
        cvv: String
    }
}, { versionKey: false });
const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;