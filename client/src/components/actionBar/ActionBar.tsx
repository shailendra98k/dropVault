import * as React from "react";
import { ActionList } from "./ActionList";
import { Drawer } from "@mui/material";
import { useDeviceContext } from "../../context/DeviceContext";
import {useActionListContext} from "../../context/ActionListContext";
import { TSFixMe } from "../../../types";



export const ActionBar = (props : TSFixMe ) => {
  const { isS } = useDeviceContext();
  const {isActionListOpen} = useActionListContext();
  
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiPaper-root": {
          width: isS ? "100%" : "280px",
          position: "relative",
          top: "0px",
        },
      }}
      open={isActionListOpen}
      anchor={isS ? "top" : "left"}
      variant={isS ? 'temporary' : "permanent"}
    >
      <ActionList/>
    </Drawer>
  );
};
