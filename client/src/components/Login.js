import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const bcrypt=require('bcryptjs')

export default function Login(){
   const serverURL='http://localhost:8000'
   const history=useHistory();
   async function hashFun(password){
    const salt = '$2a$06$MDUj.pV2IzALul7i2hYbxu';
    const hashed = await bcrypt.hash(password, salt);
    console.log("Hashed is ",hashed);
    
    return hashed;
  }

   const onSubmitHandler=async(e)=>{
       e.preventDefault();
       const username=document.getElementById('login-i1').value;
       const password=await hashFun(document.getElementById('login-i2').value)
       const data={
          'username':username,
          'password':password,
       }

       axios.post(serverURL+'/login',data, {withCredentials:true}).then((res)=>{
         if(res.data=="OK"){
             console.log("Login Successful ",res);
             history.push('/')
         }else{
            console.log("Login Failed ",res);
         }
       }).catch(function (error) {
           console.log(error)
       })



   }


    return(
    <div>
           <form >
               <input id='login-i1' type="text" placeholder="Username"/> 
               <input id='login-i2' type="password" placeholder="Password"/>
               <input type="submit" value="Submit" onClick={onSubmitHandler}/>
           </form>                                       



    </div> )
    

}

