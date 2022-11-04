// import React from 'react'


// function File(props){
    
    
    
    

//     if(props.file.type){
//         return(
//         <div style={{ display:'flex',width:'100%'}}>
//                 <div style={{ display:'inline',width:'33%'}}><a  href={`http://localhost:8000/view?filename=${props.currDir}/${props.file.name}`}  target="_blank" download> {props.file.name}</a> </div>
//                 <div style={{display:'inline', width:'33%'}}>{Math.floor(props.file.size/1024) + " KB"}</div>
//                 <div style={{display:'inline', width:'33%'}}>{props.file.date}</div> 
//         </div>
        
//         )
//     }else{
//         return(
//             <div style={{ display:'flex',width:'100%'}}>
//                     <div onClick={function(){props.setCurrDir(`${props.currDir}/${props.file.name}`) }} style={{ display:'inline',width:'33%',cursor:'pointer'}}> {props.file.name}</div>
//                     <div style={{display:'inline', width:'33%'}}>{Math.floor(props.file.size/1024) + " KB"}</div>
//                     <div style={{display:'inline', width:'33%'}}>{props.file.date}</div> 
//             </div>
//         )
//     }
    

// }

// export default File;