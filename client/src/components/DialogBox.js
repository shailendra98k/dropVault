import React from 'react'
import $ from 'jquery'
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DialogBox(props){
  
    var style={
      windowClose:{
        color:'dc3545' ,
        fontSize:'20px',
        position:'absolute',
        top:'5px',
        right:'5px'
      }
    }
    const url='http://localhost:8000';

    
    const submitHandler=function(event){
        event.preventDefault();
        var folder_name=document.getElementById('dialog-box-input-1').value
        if(folder_name.length==0) alert("Name cant be empty")
        else document.getElementById('dialog-box-input-1').value="";
     
        var currDir=props.currDir;
        const metadata={
          "name":folder_name,
          "currDir":currDir,
          "date":Date.now(),
          "size":0,
          "date":(new Date).toLocaleDateString()
        }
        $.post(`${url}/create_directory`,{directory:currDir+'/'+folder_name}).then(()=>{
            $.post(`${url}/addNewFolder`,metadata)
        .then(()=>{
            
            var temp=[...props.files,[metadata][0]];
            props.setFiles(temp)
            $('#dialog-box-div-1').removeClass('fade-in').addClass('fade-out');})})
        .catch(()=>{
          console.error("Error in creating directory...")})
      }
    const cancelHandler=function(event){
        event.preventDefault();
        document.getElementById('dialog-box-input-1').value="";
        $('#dialog-box-div-1').removeClass('fade-in').addClass('fade-out')
   
    }

    return(
      <div id='dialog-box-div-1' >
        <form  >
                <FontAwesomeIcon icon={faWindowClose}   style={style.windowClose}/>
                <input type='text' className="form-control" required id='dialog-box-input-1' name="foldername" placeholder='New Folder '/> 
                <button class="btn btn-primary" id='dialog-box-btn-1'onClick={submitHandler} type='submit'>Create </button>
                <button class="btn btn-danger" id='dialog-box-btn-2' onClick={cancelHandler} type='button'>Cancel </button>
        </form>     
      </div>
    );

}

export default DialogBox;