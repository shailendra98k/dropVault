import React, { useEffect, useState } from 'react'
import File from './File'
import axios from 'axios';
import $ from 'jquery'
function Files(props){
    console.log("in files.js, props.files is ", props.files)
    console.log("Curr_dir in files is", props.currDir)
    


    return(
        <div id="list" style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
        
            {props.files.map((file)=>{
                return  <File file={file} currDir={props.currDir} setCurrDir={props.setCurrDir} />
            })}
        </div>

       
    );

}
export default Files