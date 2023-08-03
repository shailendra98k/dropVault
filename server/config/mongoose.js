require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_CONN_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', function() {
    console.log("MongoDB up and running...")
 });
module.exports=mongoose;