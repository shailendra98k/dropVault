import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import { AppContext } from "../App";

import { BASE_URI } from "../constants";
import axios from "axios";

import FolderCard from "../components/card/FolderCard";
import FileCard from "../components/card/FileCard";

import { useHistory } from "react-router-dom";
import Dropbox from "../components/Dropbox";
import { SIDE_NAV_ID } from "../classNameConstant";

const Home = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      history.push("/sign-in");
    }
  }, []);
  return (
    <Box id={"home-container"} sx={{ display: "flex" }}>
      <SideNav setIsOpen={setIsOpen} />
      <Body />
      <Dropbox isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
};

const SideNav = (props) => {
  const { currDir, user } = React.useContext(AppContext);

  const createNewFolderHandler = () => {
    const folderName = prompt("Please input folder name!");
    if (!folderName) {
      return;
    }
    const formData = new FormData();
    formData.append("name", folderName);
    formData.append("current_dir", currDir);
    formData.append("user_id", user.id);

    axios.post(BASE_URI + "/addNewFolder", formData).then((res) => {
      console.log("Res is: ", res);
    });
  };

  return (
    <Box
      id={SIDE_NAV_ID}
      sx={{
        width: "100%",
        maxWidth: 240,
        marginLeft: 5,
        paddingRight: 1,
        flexGrow: 1,
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding sx={{ marginBottom: "5px" }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary="UPLOAD"
                onClick={() => {
                  props.setIsOpen(true);
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ marginBottom: "5px" }}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary="New Folder"
                onClick={createNewFolderHandler}
              />
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
};

const Body = () => {
  const { currDir, files, user, setFiles, directories, setDirectories } =
    React.useContext(AppContext);
  React.useEffect(() => {
    const formData = new FormData();
    formData.append("current_dir", currDir);
    formData.append("user_id", user.id);
    axios.post(BASE_URI, formData).then((res) => {
      console.log("Daat received:", res);
      setDirectories(res.data.sub_dirs);
      setFiles(res.data.files);
    });
  }, [currDir, setDirectories, setFiles, user.id]);
  React.useEffect(() => {
    console.log("Curr Dir is:", currDir);
    console.log("User is:", user);
  });

  return (
    <Box style={{ flexGrow: 4, height: "90vh", overflow: "scroll" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {directories.map((dir) => {
          return <FolderCard data={dir} userid={user.id} />;
        })}
      </Box>

      <Box sx={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}>
        {files.map((file) => {
          return <FileCard data={file} />;
        })}
      </Box>
    </Box>
  );
};

export default Home;
