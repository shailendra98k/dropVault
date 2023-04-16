import React from 'react';
import axios from 'axios';
import $ from 'jquery'
import {useState,useEffect, useContext} from 'react'
import {AppContext} from '../App'
import { BASE_URI } from '../constants';

function Dropbox(props) {

    const {currDir,user} = React.useContext(AppContext)
    const [display, setDisplay] = React.useState('none')
    React.useEffect(()=>{
        if(props.isOpen){
            setDisplay('block')
        }else{
            setDisplay('none')
        }

    })
    var totalData=0;
    var dataSent=0;
    function setTotalData(val){
        totalData=val;
    }
    function setDataSent(val){
        dataSent=val;
    }
    
    function fun(file, flag){
        
        var newlyAddedFilesList=[]
            
        const formData=new FormData();
            
        file["id"]=Date.now();
        file["date"]=(new Date()).toLocaleDateString();
        formData.append('file',file);
        var metadata={
            "name":file.name,
            "size":file.size,
            "type":"file"
        }
        newlyAddedFilesList.push(metadata)
        console.log("New File Record is: ",newlyAddedFilesList, currDir);
        formData.append('user_id',user.id)
        formData.append('current_dir',currDir);
        formData.append('name', file.name);
        formData.append('size', file.size);
        formData.append('type', 0);

        axios.post('http://localhost:8001/document-add/', formData,{
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress(e){
                    console.log("Loaded :", e.loaded)
                    document.getElementById(metadata.name).value=(e.loaded/e.total)
                }
        }).then((res)=>{
            // props.setFiles([...props.files,...newlyAddedFilesList])
            // setDataSent(dataSent+metadata.size)
            // console.log("dataSent is: ",dataSent)
            // if(dataSent==totalData)props.setView("HOME")

        }).catch((err)=>{
            console.log(err);
        }) 
                
    }

    const UploadFiles=function (files){

        for(var i=0;i<files.length;i++){
            var file=files[i];
            fun(file,false,);
        }
        console.log("Dtasent is ",dataSent,totalData)
        
    }

    const UploadHandler=function(){

        const files= document.getElementById('fileElem').files
        UploadFiles(files);
        
    }

    useEffect(()=>{
        const dropArea = document.getElementById('drop-area');
        const preventDefaults=function (e) {
            e.preventDefault()
            e.stopPropagation()
        };


        const unhighlight=function  (e) {
            dropArea.classList.remove('highlight')
        };

        const highlight=function(e) {
            dropArea.classList.add('highlight')
        };

        const handleDrop =function (e) {
            let data = e.dataTransfer;
            let files = data.files;
            previewHandler(files);
            UploadFiles(files);
        };
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });
        dropArea.addEventListener('drop', handleDrop, false) 
    },[])

    const previewHandler=(param)=>{
        
        console.log("Files is: ", param);
        const files= (param.type != 'change')?param: document.getElementById('fileElem').files;
        
        [...files].forEach((file)=>{
            setTotalData(totalData+file.size);
            console.log("TotalData is: ", totalData)
            let divEle=document.createElement('div');
            let proEle=document.createElement('progress');
            let pEle=document.createElement('p');

            pEle.innerText=file.name 
            
            proEle.id=file.name;
            proEle.max=1;
            proEle.value=0;
            
            divEle.appendChild(pEle);
            divEle.appendChild(proEle);
            document.getElementById('preview').appendChild(divEle);
        })

        if(document.getElementById('fileElem').files.length)
        document.getElementById('submitBtn').classList.remove('disabled')

    }
    

    
    return (
        <div id='dropbox-modal' style={{margin:'auto', zIndex:10, position:'absolute', width:'100%', top:'30%', backgroundColor:'white', display:display}}>
            <a style={{float:'right', paddingRight:'10px', cursor:'pointer'}} onClick={()=>{props.setIsOpen(false)}}>X</a>
            <div id="drop-area">
                <form class="my-form">
                    <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
                    <input type="file" id="fileElem" multiple  onChange={previewHandler}/>
                   
                    
                     
                     <label className="button" for="fileElem">Select some files</label>
                     
                     <input type='button' id='submitBtn' className="button disabled" onClick={UploadHandler} value='Upload!'  />
                     
                </form>
               
            </div>
            <div id='preview'>

           </div>

        </div>
        
        
        
    );
  }

  export default Dropbox;