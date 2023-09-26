var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

usersSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    login_token: {
        type: String,
        trim: true
    },

});

usersSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                throw err;
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

var User = mongoose.model('users', usersSchema);

module.exports = { User };