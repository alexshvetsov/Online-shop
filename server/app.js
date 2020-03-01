const express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const keys = require("./config/keys")
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: `${__dirname}\\assets\\images` });
const passport = require('passport');
const session = require('express-session');
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const ordersController = require("./controllers/orders-controller");
const prodCategoriesController = require("./controllers/prodCategories-controller");

const server = express();
server.use(express.json());
server.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));
server.use(require('express').static(__dirname));

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, mongoClient) => {
        if (err) return console.log(err)
        console.log("we're connected to " + mongoClient.name)
    });
// passport
const MongoStore = require('connect-mongo')(session);
server.use(session({
    name: 'myname.sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
server.post("/upload-image", upload.any(), (req, res) => {
    const fileType = path.extname(req.files[0].originalname);
    const fileOriginal = `${req.files[0].destination}\\${req.files[0].filename}${fileType}`;
    const multerFilename = `${req.files[0].destination}\\${req.files[0].filename}`;
    fs.rename(multerFilename, fileOriginal, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json(`${req.files[0].filename}${fileType}`);
    });
});

require('./config/passport-config')
server.use(cookieParser());
server.use(passport.initialize())
server.use(passport.session())

server.use("/auth", authController);
server.use("/api/products", productsController);
server.use("/api/carts", cartsController);
server.use("/api/orders", ordersController);
server.use("/api/prodCategories", prodCategoriesController);

//run server
server.listen(3000, () => {
    console.log('listning');

})



