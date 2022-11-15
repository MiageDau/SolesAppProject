const mongoose = require('mongoose');

var Rate = mongoose.model('Rate',{
    _id : {type: String},
    amortiGrade : {type: Number},
    confortGrade : {type: Number},
    durabiliteGrade : {type: Number},
    designGrade : {type: Number},
    maintienGrade : {type: Number},
    gripGrade : {type: Number},
    shoe_id : {type: String},
    user_id : {type: String}
});

module.exports = {Rate};


