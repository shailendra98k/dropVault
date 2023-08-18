import * as React from "react";
import { AppBar } from "@mui/material";
import { Header } from "../../Header";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <AppBar position="static">
      <Header></Header>
    </AppBar>
  );
};
