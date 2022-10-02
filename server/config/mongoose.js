const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/dropBox', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', function() {
    console.log("MongoDB up and running...")
 });
module.exports=mongoose;