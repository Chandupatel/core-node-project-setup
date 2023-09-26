var { User } = require('../Models/User');

const userRegisterValidations = {
    first_name: {
        notEmpty: true,
        errorMessage: "First Name cannot be empty",
    },
    last_name: {
        notEmpty: true,
        errorMessage: "Last Name cannot be empty"
    },
    email: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        custom: {
            options: value => {
                return User.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Username already in use')
                    }
                })
            }
        }
    },
    phone: {
        notEmpty: true,
        errorMessage: "Phone cannot be empty"
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty",
    },
    
};

const userLoginValidations = {
    email: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        custom: {
            options: value => {
                return User.find({
                    email: value
                }).then(user => {
                    if (user.length < 1) {
                        return Promise.reject('Your credentials dose not  match.')
                    }
                })
            }
        }
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty",
    },
}


module.exports = {
    userRegisterValidations,
    userLoginValidations
};