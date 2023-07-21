import React, {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {AppContext} from '../App'

// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BASE_URI, STORAGE_URI} from '../constants'
import axios from 'axios'
import { Breadcrumbs } from "@mui/material";

import { useHistory } from 'react-router-dom';
import Dropbox from "../components/Dropbox";
import { FILE_CARD_CN , FOLDER_CARD_CN, SIDE_NAV_ID} from "../classNameConstant";
const Home = () => {

  const {user} = React.useContext(AppContext)
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(()=>{
    
    if (!sessionStorage.getItem('user')){
      history.push('/sign-in')
    }
  },[])
  return (

    <Box id={'home-container'} sx={{ display: 'flex' }}>
      <SideNav setIsOpen={setIsOpen} />
      <Body />
      <Dropbox isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Box>

  )
}



const SideNav = (props) => {
  const {currDir,user} = React.useContext(AppContext)
  
  const createNewFolderHandler = ()=>{
    const folderName = prompt("Please input folder name!")  
    if(!folderName) {
      return;
    }
    const formData=new FormData();
    formData.append('name', folderName);
    formData.append('current_dir',currDir);
    formData.append('user_id',user.id);

    axios.post(BASE_URI+'/addNewFolder',formData).then((res)=>{
      console.log("Res is: ", res)
    })
  }


  return (
    <Box id={SIDE_NAV_ID} sx={{ width: '100%', maxWidth: 240, marginLeft: 5, paddingRight: 1, flexGrow:1}}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="UPLOAD" onClick={()=>{props.setIsOpen(true)}} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="New Folder" onClick={createNewFolderHandler} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      {/* <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="HOME" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="ALL FILES" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="VIDEOS" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="PHOTOS" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding sx={{ marginBottom: '5px' }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="RECENT" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav> */}
    </Box>
  );
}




const useStyles = makeStyles({
  root: {
    minWidth: 255,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Body = () => {

  const {currDir, files,user,setFiles, directories, setDirectories} = React.useContext(AppContext)
  React.useEffect(()=>{
    const formData = new FormData();
    formData.append('current_dir',currDir)
    formData.append('user_id',user.id)
    axios.post(BASE_URI, formData).then((res)=>{
      console.log("Daat received:", res)
      setDirectories(res.data.sub_dirs)
      setFiles(res.data.files)
    })
  },[])
  React.useEffect(()=>{
    console.log("Curr Dir is:", currDir)
    console.log("User is:",user)
  })

  return (
    <Box style={{flexGrow:4, height:'90vh', overflow:'scroll'}}>
      <DirBreadcrumbs/>
      <Box sx={{ display: 'flex', flexWrap:'wrap' }}>
        {directories.map((dir) => {
          return <FolderCard data={dir} userid={user.id} />
        })}
      </Box>

      <Box sx={{ display: 'flex', marginTop: '10px', flexWrap:'wrap' }}>
        {files.map((file) => {
          return <FileCard data={file} />
        })}
      </Box>
    </Box>
  )
}



function FolderCard({data, userid}) {
  console.log("data is:", data)
  const classes = useStyles();
  const {currDir, setCurrDir, setDirectories, setFiles, setBreadcrumbsList} = React.useContext(AppContext)

  const getIntoFolderHandler = (currDir,name)=>{
    const formData = new FormData();
    formData.append('current_dir',currDir=='/'?currDir+name:currDir+'/'+name)
    formData.append('user_id',userid)
    axios.post(BASE_URI,formData).then((res)=>{
      console.log("Response is: ", res);
      setDirectories(res.data.sub_dirs)
      setFiles(res.data.files)

      setCurrDir(currDir=='/'?(currDir+name):(currDir+"/"+name)) 
      const breadCrumbString = (currDir=='/')?(currDir+name):(currDir+"/"+name)
      setBreadcrumbsList(("Home"+breadCrumbString).split('/'))
    })
  }

  return (
    <Box className={FOLDER_CARD_CN} sx={{ margin: '6px', cursor:'pointer'}}>
      <Card onClick={()=>getIntoFolderHandler(currDir,data.name)} className={classes.root}>
        <CardContent>
          <div><i style={{fontSize:'32px', color:'grey'}} class="fa fa-folder"></i></div>
          <br></br>
          <div><b>{data.name}</b></div> 
          {/* {data.counts && <div><b>{data.counts} files</b></div>} */}
          {/* {context.user} */}
        </CardContent>
      </Card>
    </Box>

  );
}
function FileCard({data}) {
  const classes = useStyles();
  const {currDir, user, setCurrDir, setDirectories, setFiles, setBreadcrumbsList} = React.useContext(AppContext)
  const onClickHandler = ()=>{
//    const path_uri = currDir=='/'?`/${user.id}/${data.id}`:`/${user.id}${currDir}/${data.id}`
//    window.open(STORAGE_URI+path_uri,'_blank');
    window.open('http://localhost/media/'+data.id,'_blank');
  }
  
  return (
    <Box className={FILE_CARD_CN} sx={{ margin: '6px', cursor:'pointer'}}>
      <Card className={classes.root} onClick={()=>onClickHandler()}>
        <CardContent>
          <div><i style={{fontSize:'32px', color:'grey'}} class="fa fa-file-pdf-o"></i></div>
          <br></br>
          <p style={{width:'200px', height:'60px', wordWrap:'break-word'}}><b>{data.filename}</b></p> 
          {/* {data.size && <div><b>{data.size} MB</b></div>}    */}
        </CardContent>
      </Card>
    </Box>

  );
}

const DirBreadcrumbs = () => {
  const {breadcrumbsList,setCurrDir, user, currDir, setBreadcrumbsList, setFiles, setDirectories} = React.useContext(AppContext);
  var prefix = ""
  const changeDirectory = (path_uri)=>{
    const formData = new FormData();
    formData.append('current_dir',path_uri)
    formData.append('user_id',user.id)
    axios.post(BASE_URI,formData).then((res)=>{
      setDirectories(res.data.sub_dirs)
      setFiles(res.data.files)
      setCurrDir(path_uri)
      const breadCrumbString = (path_uri=='/')?"":path_uri
      setBreadcrumbsList(("Home"+breadCrumbString).split('/'))
    })
  }
  return (
     <Breadcrumbs
      separator="/"
      aria-label="breadcrumb"
      style={{padding:'20px',position:'fixed', top:'16px', paddingTop:'0px'}}
    > 
    {breadcrumbsList.map((item,index)=>{
     let path_uri;
     if (index == 0){
       path_uri = "/"
     }else if (index == 1){
       path_uri = "/"+item;
       prefix = path_uri;
     }else{
       path_uri = prefix+"/"+item;
       prefix = path_uri
     }
     
     return <Button size="large" id={path_uri} onClick={()=>{changeDirectory(path_uri)}} >{item}</Button>
    })}
    </Breadcrumbs>
  )
}

export default Home;