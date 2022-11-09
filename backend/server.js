
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const { Cookie } = require('express-session');

const User = require('./models/users');


// Configuration et connexion avec la base de données

mongoose.connect("mongodb+srv://rayan:rayan@cluster0.wue8bd9.mongodb.net/SolesAppProject?retryWrites=true&w=majority")
    .then(()=>{
        console.log('Successfully connected to DB !');
    })
    .catch((error)=>{
        console.log('Unable to connect to DB ! ');
        console.log(error);
    });
//Configuration de CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

//Configuration du bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//
app.use(session({
    secret:"mySecretKey",
    cookie:{maxAge: 24*60*60}
}));



app.listen(3000, ()=>{console.log("Listening in port 3000!")})