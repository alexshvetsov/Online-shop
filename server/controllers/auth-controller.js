const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const passport = require('passport')

router.post('/register', async (req, res, next) => {
 await addToDB(req, res);  
});


//login and save cookie
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err);}
        if (!user) {  return res.status(501).json(info) }
        req.logIn(user, function (err) { // login func is passport func that calls the serialize to save the cookie
            if (err) {   return res.status(501).json(err); }
            req.session.save(function(){
            });
            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.get('/home', isValidUser, function (req, res, next) {
    return res.status(200).json(req.user)
});

//logout
router.get('/logout', isValidUser, function (req, res, next) { 
    req.logout();
    return res.status(200).json({ message: "LogOut" })

}); 


//check if user is logged
router.get('/isLogged', isValidUser, function (req, res, next) {
    return res.status(200).json(req.user)
});

//check if user password and username is valid
function isValidUser(req, res, next) {
    if (req.isAuthenticated()) {
        next()}
    else return res.status(401).json({ message: "Unauthorized" })
}


//add user to DB
async function addToDB(req, res) {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: User.hashPassword(req.body.password),
        phone: req.body.phone,
    });
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    }
    catch{
        return res.status(501).send('user is aleready exist');
    }
}

module.exports = router;