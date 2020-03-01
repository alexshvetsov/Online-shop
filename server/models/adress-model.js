const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    city: String,
    street: String,
    houseNumber: Number,
    entrance: Number,
    floor: Number,
})
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;