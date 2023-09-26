var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL,{useUnifiedTopology: true},(err) => {
    if (err) {
        throw err;
    }
});

module.exports = mongoose;