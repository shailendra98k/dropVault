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
  const onClickHandler = (download: number) => {
    window.open(`${BASE_URI}/media/${data.id}?d=${download}`, "_blank");
  };

  const [hovering, setHovering] = React.useState(false);

  return (
    <Box
      style={{ cursor: "pointer" }}
      className={FILE_CARD_CN}
      sx={{ margin: "6px" }}
      onMouseLeave={() => setHovering(false)}
      onMouseEnter={() => setHovering(true)}
      onClick={() => onClickHandler(0)}
    >
      <Card className={classes.root}>
        <CardContent>
          <div>
            <FileBasedIcon filename={data.filename} />
            <div
              style={{
                display: hovering ? "inline" : "none",
                float: "right",
                opacity: "0.5",
                cursor: "pointer",
              }}
              onClick={() => onClickHandler(1)}
            >
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/3d-fluency/94/down.png"
                alt="down"
              />
            </div>
          </div>
          <br></br>
          <div style={{ cursor: "pointer" }}>
            <p
              style={{
                width: "200px",
                height: "24px",
                wordWrap: "break-word",
                overflow: "hidden",
              }}
            >
              <b>{data.filename}</b>
            </p>
            <Divider
              style={{ marginTop: "4px", marginBottom: "4px", opacity: 0.5 }}
            />
            <div style={{ fontSize: "12px" }}> File Size</div>
            <div style={{ fontSize: "14px", opacity: 0.5 }}>
              {" "}
              {data.size} Mb{" "}
            </div>
            {/* {context.user} */}
            <div style={{ fontSize: "12px", opacity: 0.6, paddingTop: "4px" }}>
              Created at {isoToLocalDateString(data.createdAt)}{" "}
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
