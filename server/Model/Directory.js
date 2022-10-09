
const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Directory = new Schema ({
    dir_name:{
        type:String,
        required:true
    },
    files:{
        type: Array,
        required: true,
        default:[]
    },
    sub_dirs:{
        type:Array,
        required: true,
        default:[]
    },
    size:{
        type:Number,
        default:0
    },
    counts: {
        type: Number,
        default:0
    }
}, {timestamps:true});
module.exports=mongoose.model('Directory', Directory);