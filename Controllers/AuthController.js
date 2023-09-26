
var { User } = require('../Models/User');
const { validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.register = (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        new User({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password
        }).save().then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
}

exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        console.log(req.headers);

        User.findOne({'email':req.body.email}).then( (result) => {
            if (!result) { 
                return res.status(404).send(); 
            }else{
                bcrypt.compare(req.body.password, result.password, (er, bcrypt_result) => {
                    if (!bcrypt_result) {
                        return res.status(404).send();
                    }else{
                        let login_token = jwt.sign( {_id: result._id}, process.env.JWT_SECRET_KEY, {expiresIn: 5 * 60} ).toString();
			            result.login_token = login_token;
                        result.save().then( () => {
                            res.status(200).send(result);
                        }).catch( (error) => {
                            res.status(400).send(error);
                        });
                    }
                })
            }
        }).catch( (err) => {
            res.status(400).send(err);
        });
    }
}


exports.getProfile = (req, res) => {
    jwt.verify(req.token,process.env.JWT_SECRET_KEY,(err,authData)=>{
        if(err)
            res.sendStatus(403);
        else{
            res.json({
                message:"Welcome to Profile",
                userData:authData
            })
           
        }
    })
}
