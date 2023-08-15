import * as React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { BASE_URI } from "../../constants";
import { SIDE_NAV_ID } from "../../classNameConstant";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import { Divider } from "@mui/material";

export const ActionBar = (props) => {
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
      <Divider />
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
                <InboxIcon />
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
      </nav>
    </Box>
  );
};
