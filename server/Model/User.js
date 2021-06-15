
const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    name:{
       type:String,
       required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    space:{
        type:Number,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }

}, {timestamps:true});
module.exports=mongoose.model('User', User);