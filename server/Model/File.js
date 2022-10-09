const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Data = new Schema ({
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: false
    },
    type:{
        type: Number,
        required: true
    }
},{timestamps:true})
module.exports=mongoose.model('Data', Data);