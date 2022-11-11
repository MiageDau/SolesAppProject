const mongoose = require('mongoose');

var Shoe = mongoose.model('Shoe',{
    shoeName : {type: String},
    brandName : {type: String},
    // picturePath : {type: String}
});

module.exports = {Shoe};