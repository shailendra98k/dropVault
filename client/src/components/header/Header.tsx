import * as React from "react";
import { AppBar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useActionListContext } from "../../context/ActionListContext";

const useStyles = makeStyles({
  container: {
    padding: "12px",
  },
  hamburgerIcon: {
    display: "inline",
    "@media (max-width: 840px)": { display: "inline" },
    "@media (min-width: 841px)": { display: "none" },
  },
});

export const Header = () => {
  const classes = useStyles();
  const { setIsActionListOpen } = useActionListContext();

  return (
    <AppBar>
      <div className={classes.container}>
        <span
          className={classes.hamburgerIcon}
          onClick={() => {
            setIsActionListOpen(true);
          }}
        >
          <MenuIcon />
        </span>
        
        <span>&nbsp;&nbsp;<img src="./dropvault-white.ico" alt="ic" width={24} height={24}></img> &nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;Overview &nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;Features &nbsp;&nbsp;</span>
        <span style={{float:'right'}}>&nbsp;&nbsp;Sign In &nbsp;&nbsp;</span>
        <span style={{float:'right'}}>&nbsp;&nbsp;Contact Us &nbsp;&nbsp;</span>
      </div>
    </AppBar>
  );
};
export default Header;
