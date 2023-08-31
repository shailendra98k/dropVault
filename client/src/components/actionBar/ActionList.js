import * as React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { API_URI } from "../../constants";
import { SIDE_NAV_ID } from "../../classNameConstant";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import { ActionItem } from "../actionItem/ActionItem";
import { useDeviceContext } from "../../context/DeviceContext";
import { useActionListContext } from "../../context/ActionListContext";
import { useUploadModalContext } from "../../context/UploadModalContext";

export const ActionList = (props) => {
  const { currDir, user } = React.useContext(AppContext);
  const { setIsActionListOpen } = useActionListContext();
  const { setIsUploadModalOpen } = useUploadModalContext();
  const { isS } = useDeviceContext();

  const openUploadModalHandler = () => {
    setIsActionListOpen(false);
    setIsUploadModalOpen(true);
  };
  const closeActionListhandler = () => {
    setIsActionListOpen(false);
  };

  const createNewFolderHandler = () => {
    setIsActionListOpen(false);
    const folderName = prompt("Please input folder name!");
    if (!folderName) {
      return;
    }
    const formData = new FormData();
    formData.append("name", folderName);
    formData.append("current_dir", currDir);
    formData.append("user_id", user.id);

    axios.post(API_URI + "/addNewFolder", formData).then((res) => {
      console.log("Res is: ", res);
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        marginLeft: 5,
        paddingRight: 1,
        flexGrow: 1,
        margin: 0,
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          <ActionItem
            action={closeActionListhandler}
            hide={!isS}
            actionText="Close"
          />
        </List>
      </nav>
      <Divider />
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
