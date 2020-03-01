const Order= require('../models/order-model');


//add oreder to DB
function addOrder(order) {
    return new Promise((resolve, reject) => {
        let addedOrder = new Order(order);
        addedOrder.save((err, info) => {
            if (err) { return rej(err) } 
            resolve(info);
        });
    });
}

module.exports = {
    addOrder
}   