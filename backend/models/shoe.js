const mongoose = require('mongoose');

var Shoe = mongoose.model('Shoe',{
    shoeName : {type: String},
    brandName : {type: String},
    image : {type: String}
});

module.exports = {Shoe};