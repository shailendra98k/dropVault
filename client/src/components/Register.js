import React from 'react'
import axios from 'axios'

import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
const bcrypt=require('bcryptjs')

export default function Register(){
const history = useHistory();

async function hashFun(password){
    const salt = '$2a$06$MDUj.pV2IzALul7i2hYbxu';
    const hashed = await bcrypt.hash(password, salt);
    console.log("Hashed is ",hashed);
    return hashed;
  }

    const onSubmitHandler=async (e)=>{
        e.preventDefault();
        const name =document.getElementById('registerForm-i1').value;
        const username =document.getElementById('registerForm-i2').value;
        const email =document.getElementById('registerForm-i3').value;
        var password =document.getElementById('registerForm-i4').value;
        const space =document.getElementById('registerForm-i5').value;
        
       password=await hashFun(password);
       
   
   
        const data={
            "name":name,
            "username":username,
            "email":email,
            "password":password,
            "space":1
        }
   
        axios.post('http://localhost:8000/register',data).then((res)=>{
            console.log("Response from Register is: ", res);
            history.push('/login');
        })
      }

   
   



    return(
        <div>
           <form id='registerForm' >
               <input id='registerForm-i1' type="text" placeholder="Enter Name"/> 
               <input id='registerForm-i2' type="text" placeholder="Username"/> 
               <input id='registerForm-i3' type="email" placeholder="Email"/> 
               <input id='registerForm-i4' type="password" placeholder="Password"/>
               <select id='registerForm-i5'> Space in GB
                   <option>1</option>
                   <option>2</option>
                   <option>5</option>
                   <option>10</option>
               </select>

               <input type="submit" onClick={onSubmitHandler} />
           </form>                                       



    </div>
    )
}