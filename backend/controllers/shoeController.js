const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const path = require("path");  



var { Shoe } = require('../models/shoe');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './pictures',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + file.mimetype.split('/')[1]);
    }
})
const upload = multer({ storage: storage });


//Get shoes

router.get('/', (request, response) => {
    Shoe.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Shoes : ' + JSON.stringify(error, undefined, 2)); }
    });
});

//getShoesLimitedBy5
router.get('/limit', (request, response) => {
    Shoe.find((error, docs) => {
        if (!error) { response.send(docs); }
        else { console.log('Error in retrieving Shoes : ' + JSON.stringify(error, undefined, 2)); }
    }).limit(5);
});


// Post shoe to DB Fonctionne sans la gestion des images
// router.post('/',(request, response) =>{
//     console.log(request.body);
//     var shoe = new Shoe({
//         shoeName : request.body.shoeName,
//         brandName : request.body.brandName,

//     });
//     shoe.save((error,doc)=>{
//         if(!error) {
//             response.send(doc)}
//         else{ console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));}
//     });
// });

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

//get shoe Image by URL 



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