const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const File = new Schema ({
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: false
    },
    type:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    }
},{timestamps:true})
module.exports=mongoose.model('File', File);

 