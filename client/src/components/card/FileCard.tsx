import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@mui/material";
import { Box, Card, Divider } from "@material-ui/core";
import { FILE_CARD_CN } from "../../classNameConstant";
import { BASE_URI } from "../../constants";
import { FileBasedIcon } from "./FileBasedIcon";
import { isoToLocalDateString } from "../../utils";

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

export default function FileCard({
  data,
}: {
  data: { id: string; filename: string; size: number; createdAt: string };
}) {
  const classes = useStyles();
  const onClickHandler = () => {
    window.open(`${BASE_URI}/media/${data.id}`, "_blank");
  };

  return (
    <Box className={FILE_CARD_CN} sx={{ margin: "6px" }}>
      <Card className={classes.root} onClick={() => onClickHandler()}>
        <CardContent>
          <div>
            <FileBasedIcon filename={data.filename} />
          </div>
          <br></br>
          <p style={{ width: "200px", height: "24px", wordWrap: "break-word" , overflow:'hidden'}}>
            <b>{data.filename}</b>
          </p>
          <Divider
            style={{ marginTop: "4px", marginBottom: "4px", opacity: 0.5 }}
          />
          <div style={{ fontSize: "12px" }}> File Size</div>
          <div style={{ fontSize: "14px", opacity: 0.5 }}> {data.size} Mb </div>
          {/* {context.user} */}
          <div style={{ fontSize: "12px", opacity: 0.6, paddingTop: "4px" }}>
            Created at {isoToLocalDateString(data.createdAt)}{" "}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
