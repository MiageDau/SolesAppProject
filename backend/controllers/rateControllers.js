const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Rate } = require('../models/rate');
const session = require('express-session');
/**
 * Get Rates 
 * http://localhost:3000/rating
 * API Documentation - Permet l'affichage de l'intégralité des notes
 */
router.get('/', (request, response) => {
    Rate.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Rates : ' + JSON.stringify(error, undefined, 2)); }
    });
});

/**
 * Post Rate
 * http://localhost:3000/rating
 * API Documentation - Permet de noter un paire et de sauvegarder cette note en base de données
 */
router.post('/', (request,response)=>{
    console.log(request.body);
    var rate = new Rate({
        shoe_id : request.body.shoe_id,
        user_id : request.body.user_id,
        shoe_name: request.body.shoe_name,
        amortiGrade : request.body.amortiGrade,
        confortGrade : request.body.confortGrade,
        durabiliteGrade : request.body.durabiliteGrade,
        designGrade : request.body.designGrade,
        maintienGrade : request.body.maintienGrade,
        gripGrade : request.body.gripGrade
    });
    rate.save((error,doc)=>{
        if(!error) {
            response.send(doc)}
        else{ console.log('Error in Rate save : '+ JSON.stringify(error, undefined, 2));}
    })
})

/**
 * Get Rate with specific _id 
 * http://localhost:3000/rating/:id
 * API Documentation - Permet d'afficher les informations de la note en fonction de son _id'
 */
router.get('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    Rate.findById(request.params.id, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Rate retrieving : ' + JSON.stringify(error, undefined, 2)); }
    })
});


/**
 * Update Rate with specific _id 
 * http://localhost:3000/rating/:id
 * API Documentation - Permet de modifier les informations de la note en fonction de son _id'
 */
router.put('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    var rate = {
        amortiGrade : request.body.amortiGrade,
        confortGrade : request.body.confortGrade,
        durabiliteGrade : request.body.durabiliteGrade,
        designGrade : request.body.designGrade,
        maintienGrade : request.body.maintienGrade,
        gripGrade : request.body.gripGrade
    };
    Rate.findByIdAndUpdate(request.params.id, { $set: rate }, { new: true }, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Rate save : ' + JSON.stringify(error, undefined, 2)); }
    });
});

/**
 * Delete rate with specific _id 
 * http://localhost:3000/rating/:id
 * API Documentation - Permet de supprimer une note en fonction de son _id'
 */
router.delete('/:id', (request, response) => {
    if (!ObjectId.isValid(request.params.id))
        return response.status(400).send(`No record with given id : ${request.params.id}`);
    Rate.findByIdAndDelete(request.params.id, (error, doc) => {
        if (!error) { response.send(doc) }
        else { console.log('Error in Rate save : ' + JSON.stringify(error, undefined, 2)); }
    })

})

module.exports = router;