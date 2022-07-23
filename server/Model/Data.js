const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Data = new Schema ({
    name: {
        type: String,
        required: true
    },
    url_name: {
        type: String,
        required: true
    },
    counts: {
        type: Number,
        required: false
    },
    size: {
        type: Number,
        required: false
    },
    base_dir:{
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    },
    type:{
        type: Number,
        required: true
    }
},{timestamps:true})
module.exports=mongoose.model('Data', Data);