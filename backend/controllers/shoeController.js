const { request, response } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


var { Shoe } = require('../models/shoe');
const multer = require('multer');
// const MIME_TYPE_MAP = {  
//     'image/png': 'png',  
//     'image/jpeg': 'jpg',  
//     'image/jpg': 'jpg'  
//   }; 
// const storage = multer.diskStorage({
//     destination: (request,file,cb)=>{
//         const isValid = MIME_TYPE_MAP[file.mimetype];
//         let error = new Error("Invalid Mime Type")
//             if(isValid){
//                 error= null;
//             }
//         cb(error,"./backend/images");
//     },
//     filename: (request,file,cb)=>{
//         const name = file.originalname.toLowerCase().split(' ').join('_');
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name+'-'+Date.now()+'.'+ext);
//     }
// });  

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
    let url = req.protocol + '://' + req.get('host')+"/images/"+req.file.filename;
    
    var shoe = new Shoe({
        shoeName: shoeName,
        brandName: brandName,
        image : url
    })
    shoe.save((error,doc)=>{
        if(!error) {
            response.send(doc)
        }
        else{ 
            console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));
        }
    });
});


// router.post('/',multer(storage).single('myFiles'), (request, response) =>{
//     console.log(request.file);
//     const url = request.protocol+'://'+request.get('host');
//     var shoe = new Shoe({
//         shoeName : request.body.shoeName,
//         brandName : request.body.brandName,
//         image: url+"/public/images/"+request.file.filename
//     });
// shoe.save((error,doc)=>{
//     if(!error) {
//         response.send(doc)}
//     else{ console.log('Error in Shoe save : '+ JSON.stringify(error, undefined, 2));}
// });
// });


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