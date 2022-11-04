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
const File = require('./Model/File')
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

app.post('/api/v1/addNewFolder',(req,res)=>{
   const currDir=req.body.currDir;
   const newFolderName=req.body.name;
   const dir_path = req.body.current_dir=='/'?`/${req.body.user_id}/${req.body.name}`:`/${req.body.user_id}${req.body.current_dir}/${req.body.name}`
   const base_dir = req.body.current_dir=='/'?`/${req.body.user_id}`:`/${req.body.user_id}${req.body.current_dir}`
   console.log("Dir_path is: ", base_dir)
   Directory.findOne({dir_path:base_dir}).then(async (dir)=>{
      console.log("Dir in new folder is: ",dir)
      const data={
         "name":req.body.name,
         "dir_path":dir_path
      }
    
      const directory = await Directory.create(data);
      dir.sub_dirs.push(directory.id)
       
      fs.mkdir(`${__dirname}/../storage${dir_path}`,(err)=>{
         console.log(`${__dirname}/../storage${dir_path}  created...`)
      })
      dir.save()
      res.status(201)
   })
})


app.post('/api/v1/upload', function(req,res){ 

   var len=(req.files.uploaded_files.length)
   var uploaded_files=[]
   if(len)uploaded_files=req.files.uploaded_files;
   else{
      uploaded_files[0]=req.files.uploaded_files;
   }

   console.log("Req body : ", req.body)
   console.log("Req fils : ", req.files)
   
   
   const dir_path = req.body.current_dir=='/'?`/${req.body.user_id}`:`/${req.body.user_id}${req.body.current_dir}`
   
   Directory.findOne({dir_path:dir_path}).then( async (dir)=>{

      console.log(`upload${req.body.current_dir}`);
      console.log("Dir receive drom databse is, ", dir)
      console.log("Request body is: ",req.body)

      
      for( var i=0;i<uploaded_files.length;i++){
      
         var metadata={};
         metadata["filename"]=uploaded_files[i].name;
         metadata["type"]=uploaded_files[i].mimetype;
         metadata["size"]=uploaded_files[i].size;

         const file = await File.create(metadata);
         
         dir.files.push(file.id);

         let file_path=`${__dirname}/../storage${dir_path}/`+uploaded_files[i].name;
         

         fs.writeFile(file_path, uploaded_files[i].data, (err) => {
            if (err) {
               res.send("Error");
            }
            else {
               console.log("uploaded successfully..."); 
            }
         });
      }
      dir.save();
   })
   res.status(200)
   
})



app.get('/view',(req,res)=>{
   res.sendFile(`${__dirname}\\upload\\${req.query.filename}`);
})

app.post('/api/v1/sign-up/', async (req, res) => {
   /**
    * On signup, 3 task needs to be performed
    * 1. Obviously, user need to be cretaed in (Mysql DB)
    * 2. A directory to be creteas specificly for that user in the storage
    * 3. Now that directory is created, we need to store the new directory info in MongoDB
    */
   const user = await User.findAll({
      where: {
         email: req.body.email
      }
   })
   if(user.length){
      res.status(403).send("User with email already exists!!!")
   }
   //create a new user
   try{
      const new_user = await User.create({
         email:req.body.email,
         password:req.body.password,
         first_name:req.body.first_name,
         last_name:req.body.last_name
      })
   
      fs.mkdir(`../storage/${new_user.id}/`, function(err) {
         if(err){
            console.log(err);
         }else{
            console.log("Dir created for the new user")
         }
      });
      Directory.create({
         name:new_user.id,
         dir_path:`/${new_user.id}`
      });
      res.status(201).send("User created successfully!!!");
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
   
   
})
app.post('/api/v1/sign-in/', async (req,res)=>{
   const user = await User.findAll({
      where: {
         email: req.body.email,
         password: req.body.password
      }
   })
   if(!user.length){
      res.status(403).send("Incorrect credentials!!!")
   }
   res.status(200).json({
      id: user[0].id,
      email:user[0].email,
      first_name: user[0].first_name,
      last_name:user[0].last_name
   });
})

// app.post('/api/v1/',(req,res)=>{
//    console.log(req.body)
//    File.create(req.body)
//    res.send("Done")
// })
app.post('/api/v1/',(req,res)=>{
   
   const dir_path = req.body.current_dir=='/'?`/${req.body.user_id}`:`/${req.body.user_id}${req.body.current_dir}`

   Directory.findOne({dir_path:dir_path}).populate({path:'files'}).populate({path:'files'}).then((dir)=>{
      console.log("Dir and data is:", dir)
      if (!dir) return res.send({
         sub_dirs:[],
         files:[]
      })
      const data = {
         sub_dirs:dir.sub_dirs,
         files:dir.files
      };
      
      return res.send(data)
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
      writeFile("../storage/23/"+file_name,file_ext,file.data)
   } )

   res.send("Received and saved successfully...")

})

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); 
});