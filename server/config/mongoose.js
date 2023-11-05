require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGO_CONN_URL}/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', function() {
    console.log("MongoDB up and running...")
 });
module.exports=mongoose;