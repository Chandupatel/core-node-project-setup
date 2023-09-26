var express = require('express');
var router = express.Router();
const { checkSchema} = require("express-validator");

const {userRegisterValidations,userLoginValidations}  = require('../Validations/AuthValidations')

var AuthController = require('../Controllers/AuthController');

router.post('/register',checkSchema(userRegisterValidations) , AuthController.register);
router.post('/login',checkSchema(userLoginValidations),AuthController.login);
router.get('/get-profile',verifyToken,AuthController.getProfile);


function verifyToken(req,res,next){
    //Auth header value = > send token into header

    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){

        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

        //next middleweare
        next();

    }else{
        //Fobidden
        res.sendStatus(403);
    }

}

/* router.post('/register',body('first_name').isMobilePhone(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors)
    } else {
        AuthController.register(req, res);
    }
  }); */

module.exports = router;