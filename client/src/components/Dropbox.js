import React from 'react';
import axios from 'axios'

function Dropbox(props) {
    const url='http://localhost:8000';

    const onUploadHandler=function(){

        const formData=new FormData();
        const data= document.getElementById('inputFile').files
        var newFilesRecord=[]
        for(var i=0;i<data.length;i++){
            var temp=data[i];
            temp["id"]=Date.now();
            temp["date"]=(new Date()).toLocaleDateString();
            formData.append('uploaded_files',temp);
            var metadata={
                "name":temp.name,
                "date":temp.date,
                "size":temp.size,
                "type":"file"
            }
            newFilesRecord.push(metadata)
            console.log("New File Record is: ",newFilesRecord);

        }
        formData.append('current_dir',props.currDir)
        axios.post(`${url}/upload`, formData).then((res)=>{
            props.setFiles([...props.files,...newFilesRecord])
            console.log("After uploading files is: ",props.files)
            props.setView("HOME")
            }).catch((err)=>{
                console.log(err);
            }) 
    }
    
    return (
        <form  id='uploadForm' action={`${url}/upload`} method='post' encType="multipart/form-data">
            <input id='inputFile' type="file" multiple  name="uploaded_files" />
            <input type='button' onClick={onUploadHandler} value='Upload!' />
        </form>	
        
        
    );
  }

  export default Dropbox;