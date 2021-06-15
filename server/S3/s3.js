var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
const s3= require('./config')
const fs = require('fs' )

function uploadFile(path,fileName,content_type,fileData){

    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: (path+'/'+fileName.split('.')[0]).substr(2)+Date.now()+'.'+fileName.split('.')[1], 
        Body: fileData,
        ACL:'public-read',
        ContentType:content_type
        
    };
    // s3.upload(params, function(err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(`File uploaded successfully. ${data.Location}`);
    // });
};

function createNewFolder(name){
    var params = {  
        Bucket: process.env.BUCKET_NAME, 
        Key: name+"/"
       
    };
    s3.putObject(params, function (err, data) {
    if (err) {
        console.log("Error creating the folder: ", err);
        } else {
        console.log("Successfully created a folder on S3");

        }
    });
}

module.exports={uploadFile, createNewFolder}