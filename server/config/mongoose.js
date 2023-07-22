const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:kxl64444@fakedropbox.dzaelra.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', function() {
    console.log("MongoDB up and running...")
 });
module.exports=mongoose;