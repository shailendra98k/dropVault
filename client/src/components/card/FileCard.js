import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@mui/material";
import { Box, Card } from "@material-ui/core";
import { FILE_CARD_CN } from "../../classNameConstant";

const useStyles = makeStyles({
  root: {
    minWidth: 255,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function FileCard({ data }) {
  const classes = useStyles();
  const onClickHandler = () => {
    window.open("http://localhost/media/" + data.id, "_blank");
  };

  return (
    <Box className={FILE_CARD_CN} sx={{ margin: "6px", cursor: "pointer" }}>
      <Card className={classes.root} onClick={() => onClickHandler()}>
        <CardContent>
          <div>
            <i
              style={{ fontSize: "32px", color: "grey" }}
              class="fa fa-file-pdf-o"
            ></i>
          </div>
          <br></br>
          <p style={{ width: "200px", height: "60px", wordWrap: "break-word" }}>
            <b>{data.filename}</b>
          </p>
        </CardContent>
      </Card>
    </Box>
  );
}
