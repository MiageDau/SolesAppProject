const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var fileUpload = require('express-fileupload');


var { Shoe } = require('../models/shoe');


//Get shoes

router.get('/', (request, response) => {
    Shoe.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Shoes : ' + JSON.stringify(error, undefined, 2)); }
    });
});

// Post shoe to DB Fonctionne sans la gestion des images
router.post('/', (request, response) =>{
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


// Get shoe by :id
router.get('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    Shoe.findById(request.params.id, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Shoe save : ' + JSON.stringify(error, undefined, 2)); }
    })
});

// Update shoe
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



// Delete shoe
router.delete('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    Shoe.findByIdAndDelete(request.params.id, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Shoe save : ' + JSON.stringify(error, undefined, 2)); }
    })

})

module.exports = router;