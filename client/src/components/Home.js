// import React, {useState,useEffect} from 'react'
// import { useHistory } from 'react-router-dom';
// import Dropbox from './Dropbox';
// import File from './File';
// import Files from './Files';
// import NewFolder from './NewFolder';
// import $ from 'jquery'
// import axios from 'axios';
// import DialogBox from './DialogBox';
// import {AppContext} from '../App'



// function Home(){
//    ///view 0 HOME
//    ///view 1 DROPBOX
//     const url='http://localhost:8000';
//     const {currDir,setCurrDir} = React.useContext(AppContext)
//     const history = useHistory();
//     console.log("Curr Dir is:", currDir)
//     var [files,setFiles]= useState([])
//     const [view,setView]=useState("HOME");

//     const NewFolderHandler = function(){
//         $('#dialog-box-div-1').removeClass('fade-out').addClass('fade-in');  
//     }
   
   
    

//     const uploadFileHandler=function(){
//       setView("DROPBOX")
//     }

    


//     useEffect(()=>{
//         console.log("Ready to fetch data gain........")
//         axios.get( `${url}/get_files?dir=${currDir}`).then((data)=>{  
//             console.log("In Home, Data received is, ",data)
//             var temp=[]
//             for(var i=0;data.data.files && i<data.data.files.length;i++){  
//               temp.push(data.data.files[i]);
//             }
//             setFiles(temp);
//             $('#home-file-list-1').empty();
            
            
//         });
        
//     },[currDir]);

//     useEffect(()=>{
//       if(document.getElementById('home-address-bar-1')){
//         document.getElementById('home-address-bar-1').value=`${currDir}`;
//         document.getElementById('home-address-bar-1').addEventListener("keydown",function(e){
//           if(e.keyCode===13){
//             setCurrDir(document.getElementById('home-address-bar-1').value)
//           }
//         })
//       }
//     })


    
   
//     if(view=="HOME")return(
//      <div id='home-div-box-1'>
        
//         <button id='upload-files-btn-1' onClick={uploadFileHandler}>  Upload Files </button>
//         <button id='create-new-folder-btn-1' onClick={NewFolderHandler}> New Folder</button>
//         <div>
//           <input id='home-address-bar-1' type='text' style={{ width:'80%', borderRadius:'5px'}} /> 
//           <input type='text' style={{ width:'20%',borderRadius:'5px'}} placeholder='Search' />
//         </div>
//         <div id='home-div-box-2'>
//           <Files currDir={currDir} setCurrDir={setCurrDir} files={files} />
//           <DialogBox currDir={currDir} files={files} setFiles={setFiles}/>
//         </div>

        

//     </div>
//     )
//     else if(view=="DROPBOX"){
//       return <Dropbox view={view} setView={setView} currDir={currDir} files={files} setFiles={setFiles} />
//     }
  
// }
// export default Home