const mongoose = require('mongoose');

var Rate = mongoose.model('Rate',{
    shoe_id : {type: String},
    user_id : {type: String},
    shoe_name: {type:String},
    amortiGrade : {type: Number},
    confortGrade : {type: Number},
    durabiliteGrade : {type: Number},
    designGrade : {type: Number},
    maintienGrade : {type: Number},
    gripGrade : {type: Number}
});

module.exports = {Rate};


