const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs' )
const path = require('path')
var cors = require('cors')
require('dotenv').config()
const bodyParser=require('body-parser')
const download = require('download')
require('./config/mongoose')
require('./config/mysql')
const app = express();
const PORT = 8000;
const Directory = require('./Model/Directory');
const Data = require('./Model/Data')
const User = require('./Model/User')
const { createDecipher } = require('crypto');
const s3=require( './S3/s3')
const {STORAGE_DIR_PATH} = require('./config/storage')
app.use(fileUpload())
 
app.use(cors())
app.use(bodyParser());

app.get('/',(req,res)=>{
   res.send("Hi");
})



app.post('/create_directory',(req,res)=>{
   console.log("Req Body is: ", req.body);
   console.log("Creating Directory: ",{"dir":req.body.directory,"files":[]})
   Directory.create({"dir":req.body.directory,"files":[]});
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
      
      var temp=currDir+'/'+newFolderName;
      s3.createNewFolder(temp.substr(2))
      res.send({"status":200});
   })
})


app.post('/upload', function(req,res){ 
   
   
   
   
   
   
   
   
   
   
   var len=(req.files.uploaded_files.length)
   var uploaded_files=[]
   if(len)uploaded_files=req.files.uploaded_files;
   else{
      uploaded_files[0]=req.files.uploaded_files;
   }
   

   Directory.find({dir:req.body.current_dir}).then((dir)=>{
      console.log(`upload${req.body.current_dir}`);
      console.log("Dir receive drom databse is, ", dir)
      console.log("Request body is: ",req.body)

      
      // for( var i=0;i<uploaded_files.length;i++){
         
      var file=req.files.uploaded_files;
      var metadata={};
      metadata["name"]=file.name;
      metadata["type"]=file.mimetype;
      metadata["size"]=file.size;
      metadata["id"]=Date.now();
      metadata["date"]=new Date(Date.now()).toLocaleString();
      dir[0].files.push(metadata);
      let data=file.data;
      
      let file_path=`${__dirname}/upload/${req.body.current_dir.substr(2)}/`+file.name;
      
      fs.writeFile(file_path, file.data, (err) => {
         if (err) {
            res.send("Error");
         }
         else {
            console.log("uploaded successfully..."); 
         }
      });
      s3.uploadFile(req.body.current_dir,metadata.name,metadata.type,data);

      
      
         
      
      // }
      dir[0].save();

      return res.send(metadata)
   })
  
   
})



app.get('/view',(req,res)=>{
   res.sendFile(`${__dirname}\\upload\\${req.query.filename}`);
})



app.post('/api/v1/',(req,res)=>{
   console.log(req.body)
   Data.create(req.body)
   res.send("Done")
})
app.get('/api/v1/*',(req,res)=>{
   const dir = req.path.slice(7)
   Data.find({base_dir:dir}).then((dirty_data)=>{
      const clean_data = {
         directories:[],
         files:[]
      };
      dirty_data.map((data)=>{
         if(data.type==0){
            clean_data.directories.push(data)
         }else{
            clean_data.files.push(data)
         }
      })
      return res.send(clean_data)
   })
})

app.post('/api/v1/upload/',(req,res)=>{

   
   const files = []
   if(req.files.file.length){
      files.push(...req.files.file)
   } else {
      files.push(req.files.file)
   }

   function writeFile(name,extn,data,increment=0){
      const file_path= increment ?(name+'('+increment+').'+extn):(name+'.'+extn)
      fs.writeFile(file_path,data, { flag: 'wx' }, (err) => {
         if (err) {
            if (err.code === "EEXIST"){
               writeFile(name,extn,data,increment+1)
            }
         }
         else {
            console.log(`${name} saved...`); 
         }
      });
   }
   
   files.map((file)=>{
      let file_name = file.name.split('.').slice(0,-1).toString().replaceAll(',','.');
      let file_ext = file.name.split('.').slice(-1).toString()
      writeFile("../storage/Guest/"+file_name,file_ext,file.data)
   } )

   res.send("Received and saved successfully...")

})

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); 
});