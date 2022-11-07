import Recat from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = ()=>{
    return (
        <div  style={{padding:'20px'}}>
            <span id='hamburger' onClick={()=>{
                const displayStyle = document.getElementById('sidenav').style.display;
                if(!displayStyle || displayStyle=='none'){
                    document.getElementById('sidenav').style.display = 'block'
                }else{
                    document.getElementById('sidenav').style.display='none'
                }
            }}><MenuIcon/> &nbsp; &nbsp;</span>
            <span>Your DropBox</span>
        </div>
    )
}