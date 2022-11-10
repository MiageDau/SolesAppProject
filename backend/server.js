
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const { Cookie } = require('express-session');

const User = require('./models/users');
const { request, response } = require('express');
const { json } = require('body-parser');


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



//Middleware de connexion
app.post('/login',(request, response) =>{
    User.findOne({login:request.body.login, password:request.body.password}, (error, user)=>{
        if(error) return response.status(401).json({msg: "Error"});
        if(!user) return response.status(401).json({msg: "Wrong login"});
        if(user){
            request.session.userId = user._id;
            response.status(200).json({
                        login:user.login,
                        fullname: user.fullname
            });
            console.log(user);
            console.log("Connexion réussis!");
        }    
    });
})
//Fin du Middleware de connexion

//Middleware d'enregistrement
app.post('/register',(request, response)=>{
    var newUser = new User({
        login: request.body.login,
        password: request.body.password,
        fullname: request.body.fullname
    });
    console.log(newUser);
    User.countDocuments({login: newUser.login}, (err,count)=>{
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

//Middleware de Logout
app.get('/logout', (request, response) => {
    request.session.destroy(error =>{
        if(error) return response.status(409).json({msg:"Error"});
        response.status(200).json({msg: "Logout OK"});
    })
});
//Fin du Middleware de Logout

//Middleware IsLogged

app.get('/isLogged', (request,response) => {
    if(!request.session.userId) return response.status(401).json();

    User.findOne( {_id: request.session.userId}, (error,user) => {
        if(error) return response.status(401).json({msg:"Error"});
        if(!user) return response.status(401).json({msg:"Error"});
        request.session.userId = user._id;
        response.status(200).json({
            login: user.login,
            fullname: user.fullname
        });
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


app.listen(3000, ()=>{console.log("Listening in port 3000!")})