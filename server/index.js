
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs' )
const path = require('path')
var cors = require('cors')


const bodyParser=require('body-parser')
const download = require('download')
const mongoose = require('./config/mongoose')
const app = express();
const PORT = 8000;
const Directory = require('./Model/Directory');
const { createDecipher } = require('crypto');

app.use(fileUpload())
 
app.use(cors())
app.use(bodyParser());

const db = mongoose.connection;
db.once('open', function() {
   console.log("MongoDB up and running...")
});

app.get('/',(req,res)=>{
   res.send("Hi");
})



app.post('/create_directory',(req,res)=>{
   console.log("Req Body is: ", req.body);
   console.log("Creating Directory: ",{"dir":req.body.directory,"files":[]})
   Directory.create({"dir":req.body.directory,"files":[]})
   res.send("Done")
})

app.get('/get_files', (req,res)=>{
   console.log("Curr_dir is: ", req.query.dir);
   Directory.find({dir:req.query.dir}).then((dir)=>{
      console.log(dir);
      res.send(dir[0]);
   }) 
  
})

app.post('/addNewFolder',(req,res)=>{
   console.log("in addNewFolder, ",req.body)
   const currDir=req.body.currDir;
   const newFolderName=req.body.name;

   Directory.find({dir:currDir}).then((dir)=>{

      const document={
         "name":req.body.name,
         "date":req.body.date,
         "size":req.body.size
      }
      console.log("What is dir", dir)
      dir[0].files.push(document);
      dir[0].save();
      
      fs.mkdir(__dirname+'/upload/'+currDir.substr(1)+'/'+req.body.name,(err)=>{
         console.log(__dirname+'/upload/'+currDir.substr(1)+req.body.name +"   created...")
      })
      res.send({"status":200});
   })
})


app.post('/upload', (req,res)=>{ 
   var len=(req.files.uploaded_files.length)
   var uploaded_files=[];
   if(len)uploaded_files=req.files.uploaded_files;
   else{
      uploaded_files[0]=req.files.uploaded_files;
   }
   console.log("Hey i m here..", req.body)

   Directory.find({dir:req.body.current_dir}).then((dir)=>{
      console.log(`upload${req.body.current_dir}`);
      console.log("Dir receive drom databse is, ", dir)
      console.log("Request body is: ",req.body)
      for( var i=0;i<uploaded_files.length;i++){
         
         var file={};
         console.log("Hello...",uploaded_files[i]);
         file["name"]=uploaded_files[i].name;
         file["type"]=uploaded_files[i].mimetype;
         file["size"]=uploaded_files[i].size;
         file["id"]=Date.now();
         file["date"]=new Date(Date.now()).toLocaleString();
         console.log("Hi", file)
         dir[0].files.push(file);
         const  fun=(err)=>{
            if (err) {
                  res.send("Error")
            }
            else{
                  console.log("uploaded successfully..."); 
            }    
         }; 
         fs.writeFile(`${__dirname}/upload/${req.body.current_dir.substr(2)}/`+file.name , uploaded_files[i].data,  fun); 
      }
      dir[0].save();

      return res.send("Fuck")
     
      

   })
  
   
})



app.get('/view',(req,res)=>{
   res.sendFile(`${__dirname}\\upload\\${req.query.filename}`);
})



app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); 
});