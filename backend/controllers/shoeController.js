const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Shoe } = require('../models/shoe');

// Configuration MULTER pour la gestion des fichiers
// const multer = require('multer');
// const MIME_TYPE_MAP = {
//     'image/png' : 'png',
//     'image/jpeg' : 'jpg',
//     'image/jpg' : 'jpg'
// }
// const storage = multer.diskStorage({
//     destination : (request, file, callback)=>{
//         const isValid = MIME_TYPE_MAP[file.mimetype]
//         let error = new Error("Invalid Mime Type");
//         if(isValid){
//             error = null;
//         }
//         callback(error,'../public/images');
//     },
//     filename:(request, file, callback)=>{
//         const name = file.originalname.toLowerCase().split(' ').join(' ');
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         callback(null, name+ '-'+ Date.now()+'.'+ext);
//     }
// });
// Fin de la configuration MULTER pour la gestion des fichiers


//Get shoes

router.get('/', (request, response) =>{
    Shoe.find((error, docs)=>{
        if(!error) {response.send(docs);}
        else{ console.log('Error in retrieving Shoes : '+ JSON.stringify(error, undefined, 2));}
    });
});

// Post shoe to DB
router.post('/', (request, response) =>{
    
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



// Get shoe by :id
router.get('/:id', (request,response)=>{
    if(!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${req.params.id}`);
    Shoe.findById(request.params.id, (error,doc) =>{
        if (!error) {response.send(doc)}
        else{ console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));}
    })
});

// Update shoe
router.put('/:id', (request,response)=>{
    if(!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${req.params.id}`);
    var shoe = {
        shoeName : request.body.shoeName,
        brandName : request.body.brandName,
    };
    Shoe.findByIdAndUpdate(request.params.id, { $set: shoe}, {new: true}, (error, doc) =>{
        if (!error) {response.send(doc)}
        else{ console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));}
    });
});



// Delete shoe
router.delete('/:id', (request,response)=>{
    if(!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${req.params.id}`);
    Shoe.findByIdAndDelete(request.params.id, (error, doc)=>{
        if (!error) {response.send(doc)}
        else{ console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));}
    })

})

module.exports = router;