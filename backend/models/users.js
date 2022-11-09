const mongoose = require('mongoose');

//Mise en place du schéma Mongoose d'un user
const userSchema = mongoose.Schema({
    login: { type: String, required : true},
    fullname: { type: String, required : true},
    password: { type: String, required : true}
});

module.exports = mongoose.model('User',userSchema);