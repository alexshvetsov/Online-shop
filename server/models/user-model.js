const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema =new Schema({
    firstName: String,
    lastName: String,
    username:String,
    email: String,
    password: String,
    phone:String,
    role:Number,
    address: { type: mongoose.Schema.Types.Mixed, ref: 'Address' }
}, { versionKey: false });

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}


// userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema, "users");

module.exports = User;  