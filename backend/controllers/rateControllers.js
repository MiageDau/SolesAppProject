const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Rate } = require('../models/rate');

//Get Rates
router.get('/', (request, response) => {
    Rate.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Shoes : ' + JSON.stringify(error, undefined, 2)); }
    });
});

// Poster une notation sur une chaussure précise
router.post('/', (request,response)=>{
    console.log(request);
})


module.exports = router;