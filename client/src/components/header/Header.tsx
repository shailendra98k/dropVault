import * as React from "react";
import { AppBar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useActionListContext } from "../../context/ActionListContext";
import { useDeviceContext } from "../../context/DeviceContext";

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
  const { isS, isM, isL } = useDeviceContext();
  const classes = useStyles();
  const { setIsActionListOpen } = useActionListContext();

  return (
    <AppBar>
      <div className={classes.container}>
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          <span>
            &nbsp;&nbsp;
            <img
              src="./dropvault-white.ico"
              alt="ic"
              width={24}
              height={24}
            ></img>
            &nbsp; DropVault &nbsp;&nbsp;
          </span>
        </a>

        <span
          className={classes.hamburgerIcon}
          onClick={() => {
            setIsActionListOpen(true);
          }}
          style={{ display: isS || isM ? "inline" : "none", float: "right" }}
        >
          <MenuIcon />
        </span>
      </div>
    </AppBar>
  );
};
export default Header;
