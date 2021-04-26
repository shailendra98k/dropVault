
const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Directory = new Schema ({
    dir:{
        type:String,
        required:true
    },
    files:{
        type: Array,
        required: true,
        default:[]
    },
    size:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

}, {timestamps:true});
module.exports=mongoose.model('Directory', Directory);