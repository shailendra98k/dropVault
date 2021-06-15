
import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { faArrowCircleDown, faEye, faFile, faFolder, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {  } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import pdfLogo from '../LOGO/icons8-adobe-acrobat-reader-64.png'
import audioLogo from '../LOGO/icons8-archive-folder-64.png'
import fileLogo from '../LOGO/icons8-document-64.png'
import folderLogo from '../LOGO/icons8-folder-64.png'
import videoLogo from '../LOGO/icons8-video-file-64.png'
import zipLogo from '../LOGO/icons8-archive-folder-64.png'
import exeLogo from '../LOGO/iconfinder_285685_exe_file_icon_64px.png'
import imageLogo from '../LOGO/icons8-image-file-64.png'
import pptxLogo from '../LOGO/pptx.png'
import unknownLogo from '../LOGO/icons8-file-48.png'
import dots from '../LOGO/icons8-menu-vertical-16.png'
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function File(props){
   console.log( "Props in file is: ", props)
   var filename=props.file.name.split('.')[0];
   var extension=props.file.name.split('.')[1];
   console.log(filename, extension)
   var icon=faFolder;
   
   let size=props.file.size;
   let sizeUnit='KB';

   if(size>1024){
       size=size/1024;
       sizeUnit='MB';

       if(size>=1024){
           size=size/1024;
           sizeUnit='GB';
       }
   }
   size=(Math.round(size*10))/10;
   

   let visiblity='none';


//    if(extension) {
//        icon=faFile
//        extension=extension.substr(0,4).toUpperCase();
//        visiblity='visible';
//    }
   
    var logoDict={
        'avi':videoLogo,
        'mp4':videoLogo,
        'mp3':audioLogo,
        'pdf':pdfLogo,
        'docx':fileLogo,
        'txt':fileLogo,
        'jpeg':imageLogo,
        'jpg':imageLogo,
        'png':imageLogo,
        'exe':exeLogo, 
        'pptx':pptxLogo,
        'xlsx':pptxLogo,
        'xlsx':pptxLogo
    }
    var logo=unknownLogo;
    
   if(extension==undefined){
       logo=folderLogo;
   }else if (extension in logoDict){
       logo=logoDict[extension]
   }
   var color=getRandomColor();

   

    
    return (
        <div className='card1'  >
            <div className='file' style={{position:'relative'}}  >
                
               <img className='verticalDots' src={dots} height='16px' width='16px'  /> 

               <img src={logo}  height='64px'width='64px'  style={{display:'inherit',margin:'auto'}} />
               <div style={{textAlign:'center' }}> <p style={{wordWrap:'break-word', color:'grey'}}>{filename} </p> </div>

            </div>

        </div>
    )
    
    

    // if(props.file.type){
    //     return(
    //     <div style={{ display:'flex',width:'100%'}}>
    //             <div style={{ display:'inline',width:'33%'}}><a  href={`http://localhost:8000/view?filename=${props.currDir}/${props.file.name}`}  target="_blank" download> {props.file.name}</a> </div>
    //             <div style={{display:'inline', width:'33%'}}>{Math.floor(props.file.size/1024) + " KB"}</div>
    //             <div style={{display:'inline', width:'33%'}}>{props.file.date}</div> 
    //     </div>
        
    //     )
    // }else{
    //     return(
    //         <div style={{ display:'flex',width:'100%'}}>
    //                 <div onClick={function(){props.setCurrDir(`${props.currDir}/${props.file.name}`) }} style={{ display:'inline',width:'33%',cursor:'pointer'}}> {props.file.name}</div>
    //                 <div style={{display:'inline', width:'33%'}}>{Math.floor(props.file.size/1024) + " KB"}</div>
    //                 <div style={{display:'inline', width:'33%'}}>{props.file.date}</div> 
    //         </div>
    //     )
    // }
    
}

export default File;