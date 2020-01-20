const mongoose = require('mongoose');

// connect to your noSQL database
mongoose.connect('mongodb://localhost/noderest');
mongoose.Promise = global.Promise;

module.exports = mongoose;
