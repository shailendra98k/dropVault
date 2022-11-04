
const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const Directory = new Schema ({
    name:{
        type:String,
        required:true
    },
    dir_path:{
        type:String,
        required:true
    },
    files:{
        type: [{ type: Schema.Types.ObjectId, ref: 'File' }]
    },
    sub_dirs:{
        type: [{ type: Schema.Types.ObjectId, ref: 'Directory' }]
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