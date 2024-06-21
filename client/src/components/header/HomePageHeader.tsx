import * as React from "react";
import { AppBar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useActionListContext } from "../../context/ActionListContext";

const useStyles = makeStyles({
  container: {
    margin: "12px",
    fontSize: "20px",
    fontWeight: 200,
  },
  hamburgerIcon: {
    display: "inline",
    "@media (max-width: 840px)": { display: "inline" },
    "@media (min-width: 841px)": { display: "none" },
  },
});

export const HomaPageHeader = () => {
  const classes = useStyles();
  const { setIsActionListOpen } = useActionListContext();

  return (
    <AppBar>
      <div className={classes.container}>
        <a href="/" style={{ color: "white" , textDecoration:'none'}}>
          {" "}
          <span>
            &nbsp;&nbsp;
            <img
              src="./dropvault-white.ico"
              alt="ic"
              width={24}
              height={24}
            ></img>{" "}
            &nbsp;&nbsp;
          </span>
        </a>

        <a href="#overview" style={{ color: "white" , textDecoration:'none'}}>
          {" "}
          <span>&nbsp;&nbsp;Overview &nbsp;&nbsp;</span>
        </a>
        <a href="#feature" style={{ color: "white" , textDecoration:'none'}}>
          {" "}
          <span>&nbsp;&nbsp;Feature &nbsp;&nbsp;</span>
        </a>
      </div>
    </AppBar>
  );
};
