
//Importation des librairies et création des variables utiles
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

const User = require('./models/users');
const { request, response } = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Shoe } = require('./models/shoe');
var shoeController = require('./controllers/shoeController');
var rateController = require('./controllers/rateControllers');
var user_id = "";
const { use } = require('./controllers/shoeController');
const path = require("path");  


/**
 * Configuration et connexion avec la base de données MongoDB
 */
mongoose.connect("mongodb+srv://rayan:rayan@cluster0.wue8bd9.mongodb.net/SolesAppProject?retryWrites=true&w=majority")
    .then(()=>{
        console.log('Successfully connected to DB !');
    })
    .catch((error)=>{
        console.log('Unable to connect to DB ! ');
        console.log(error);
    });

/**
* Configuration de CORS 
*/   
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


/**
 * Configuration du bodyParser
 */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Configuration de express-session
 */
app.use(session({
    secret:"mySecretKey",
    cookie:{maxAge: 24*60*60},
    user:{user_id}
}));


/**
 * Middleware permettant la connexion sur le site
 * Création de la session
 */
app.post('/login',(request, response) =>{
    User.findOne({login:request.body.login, password:request.body.password}, (error, user)=>{
        if(error) return response.status(401).json({msg: "Error"});
        if(!user) return response.status(401).json({msg: "Wrong login"});
        if(user){
            request.session.userId = user._id;
            user_id = user._id;
            console.log(request.session);
            response.status(200).json({
                        id: user._id,
                        login: user.login,
                        fullname: user.fullname
            });
            console.log("Connexion réussis!");
            console.log("userId connected : "+ user_id);
             
        }    
    });
})
//Fin du Middleware de connexion


/**
 * Middleware permettant l'enregistrement d'un compte sur notre site
 */
app.post('/register',(request, response)=>{
    var newUser = new User({
        login: request.body.login,
        password: request.body.password,
        fullname: request.body.fullname
    });
    User.countDocuments({login: newUser.login}, function(err,count){
        if(err) return response.status(401).json({msg:"Error"});
        if(count>0){
            return response.status(409).json({msg:"This login already exists !!"});
        }
        else{
            newUser.save((error,user)=>{
                if(error) return console.error(err);
                request.session.userId = user._id;
                response.status(200).json({
                    _id: user._id,
                    login: user.login,
                    fullname: user.fullname
                });
            });
        }
    console.log("User successfully added");
    });
});
//Fin du Middleware d'enregistrement


/**
 * Middleware permettant la deconnexion d'un utilisateur sur notre site
 * Destruction de la session
 */
app.get('/logout', (request, response) => {
    console.log(request.session)
    request.session.destroy(error => {
        console.log("destroying session....")
        if(error) return response.status(409).json("Error");
        response.status(200).json("Logout OK");
    })
});
//Fin du Middleware de Logout

/**
 * Middleware permettant de savoir si l'utilisateur est ou non connecté
 */
app.get('/islogged', (request,response) => {
    if(!request.session.userId) return response.status(401).json();


    User.findOne( {_id: request.session.userId}, (error,user) => {
        if(error) return response.status(401).json({msg:"Error"});
        if(!user) return response.status(401).json({msg:"Error"});
        request.session.userId = user._id;
        response.status(200).json({
            id: user._id,
            login: user.login,
            fullname: user.fullname
        });
        console.log(request.session.userId);
    });
});
//Fin du Middleware IsLogged



//Middleware getUser
app.get('/users', (request,response)=>{
    User.find((err,docs)=>{
        if(!err) {response.send(docs);}
        else {console.log("Erreur in retrieving User list : "+JSON.stringify(err,undefined,2))}
    })
})
// Fin du Middlewar getUser


/**
 * Nécessaire pour stocker les images en server
 */
app.use('/pictures',express.static('./pictures'));


/**
 * Middleware permettant d'avoir l'ensemble des requetes de notre API pour la partie shoe present dans le shoeController
 */
app.use('/shoes', shoeController);
//Fin Middleware get shoes

/**
 * Middleware permettant d'avoir l'ensemble des requetes de notre API pour la partie Rate present dans le rateController
 */
app.use('/rating', rateController);
//Fin Middleware rate


app.listen(3000, ()=>{console.log("Listening in port 3000!")})