import * as React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
export const ActionItem = (props) => {
  return (
    <ListItem onClick={props.action} id={props.id} disablePadding sx={{ marginBottom: "5px", display: props.hide?'none':'initial' }}>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText
          primary={props.actionText}
        />
      </ListItemButton>
    </ListItem>
  );
};
