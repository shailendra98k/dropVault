import * as React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { BASE_URI } from "../../constants";
import { SIDE_NAV_ID } from "../../classNameConstant";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import { ActionItem } from "../actionItem/ActionItem";

export const ActionBar = (props) => {
  const { currDir, user } = React.useContext(AppContext);

  const openUploadModalHandler = () => {
    props.setIsOpen(true);
  };

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
          <ActionItem action={openUploadModalHandler} actionText="UPLOAD" />
          <ActionItem action={createNewFolderHandler} actionText="New Folder" />
        </List>
      </nav>
      <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          <ActionItem actionText="HOME" />
          <ActionItem actionText="ALL FILES" />
          <ActionItem actionText="VIDEOS" />
          <ActionItem actionText="PHOTOS" />
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ActionItem actionText="RECENT" />
        </List>
      </nav>
    </Box>
  );
};
