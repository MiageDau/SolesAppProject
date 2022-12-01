const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const path = require("path");  
var { Shoe } = require('../models/shoe');
const multer = require('multer');


/**
 * Initialisation de la librairie Multer pour stocker les images dans le dossier /pictures
 */
const storage = multer.diskStorage({
    destination: './pictures',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + file.mimetype.split('/')[1]);
    }
})
const upload = multer({ storage: storage });


/**
 * Get shoes 
 * http://localhost:3000/shoes
 * API Documentation - Permet l'affichage de l'intégralité des chaussures
 */
router.get('/', (request, response) => {
    Shoe.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Shoes : ' + JSON.stringify(error, undefined, 2)); }
    });
});


/**
 * Get shoes with restiction : 5
 * http://localhost:3000/shoes
 * API Documentation - Permet l'affichage des cinqs premières chaussures de la BDD
 */
router.get('/limit', (request, response) => {
    Shoe.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Shoes : ' + JSON.stringify(error, undefined, 2)); }
    }).limit(5);
});


/**
 * Post shoes 
 * http://localhost:3000/shoes
 * API Documentation - Permet d'ajouter une chaussure et de la stocker en bdd, avec gestion de l'image
 */
router.post('/', upload.single('file'), (req, res) => {
    console.log(req);
    console.log(req.file);
    let shoeName = req.body.shoeName;
    let brandName = req.body.brandName;
    let url = req.protocol + '://' + req.get('host')+"/pictures/"+req.file.filename;
    
    var shoe = new Shoe({
        shoeName: shoeName,
        brandName: brandName,
        image : url
    })
    shoe.save();

});

/**
 * Get shoe by :id
 * http://localhost:3000/shoes/:id
 * API Documentation - Permet l'affichage des informations d'une chaussure par son _id
 */
router.get('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    Shoe.findById(request.params.id, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Shoe save : ' + JSON.stringify(error, undefined, 2)); }
    })
});

/**
 * Update shoe by :id
 * http://localhost:3000/shoes/:id
 * API Documentation - Permet la modification des informations d'une chaussure par son _id
 */
router.put('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    var shoe = {
        shoeName: request.body.shoeName,
        brandName: request.body.brandName,
    };
    Shoe.findByIdAndUpdate(request.params.id, { $set: shoe }, { new: true }, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Shoe save : ' + JSON.stringify(error, undefined, 2)); }
    });
});

/**
 * Delete shoe by :id
 * http://localhost:3000/shoes/:id
 * API Documentation - Permet la suppression d'une chaussure par son _id
 */
router.delete('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    Shoe.findByIdAndDelete(request.params.id, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Shoe save : ' + JSON.stringify(error, undefined, 2)); }
    })

})


module.exports = router;


/*
Post shoe to DB Fonctionne sans la gestion des images
router.post('/',(request, response) =>{
    console.log(request.body);
    var shoe = new Shoe({
        shoeName : request.body.shoeName,
        brandName : request.body.brandName,

    });
    shoe.save((error,doc)=>{
        if(!error) {
            response.send(doc)}
        else{ console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));}
    });
});
*/