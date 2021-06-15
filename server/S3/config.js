
var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');

const fs = require('fs' )
const s3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
 });
module.exports=s3;

