import React from 'react'
import path from 'path'
import $ from 'jquery'
import axios from 'axios'
import download from 'download'
import fs from 'fs'


function NewFolder(){


    const onClickHandler=()=>{
       const dir= __dirname+'server/upload/vid.mkv';
       fetch(`http://localhost:8000/download${dir}`).then(resp => resp.blob())
       .then(blob => {
        console.log(blob)
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.style.display = 'none';
         a.href = url;
         // the filename you want
         a.download = '00.mkv';
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
        //  alert('your file has downloaded!'); 
       })
       .catch(() => alert('oh no!'));
     
  
    //    download(`http://localhost:8000/download${dir}`,'Downloads').then(()=>{
    //        console.log("Downloaded")
    //    })
    //    var xhr = new XMLHttpRequest();
    //    alert(dir);
    //    xhr.open('GET',`http://localhost:8000/download${dir}`);
    //    xhr.send();
    }

    return(
        <div>
           <button >New Folder </button>
        </div>
    );

}

export default NewFolder