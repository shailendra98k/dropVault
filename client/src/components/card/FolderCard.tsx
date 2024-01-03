import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@mui/material";
import { Box, Card, Divider } from "@material-ui/core";
import { API_URI } from "../../constants";
import axios from "axios";
import { FOLDER_CARD_CN } from "../../classNameConstant";
import { useDefaultContext } from "../../context/DefaultContext";
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

export default function FolderCard({
  data,
  userid,
}: {
  data: { name: string; counts: number; size: number; createdAt: string };
  userid: string;
}) {
  console.log("data is:", data);
  const classes = useStyles();
  const { currDir, setCurrDir, setDirectories, setFiles, setBreadcrumbsList } =
    useDefaultContext();

  const getIntoFolderHandler = (currDir: string, name: string) => {
    const formData = new FormData();
    formData.append(
      "current_dir",
      currDir === "/" ? currDir + name : currDir + "/" + name
    );
    formData.append("user_id", userid);
    axios.post(API_URI, formData).then((res) => {
      console.log("Response is: ", res);
      setDirectories(res.data.sub_dirs);
      setFiles(res.data.files);

      setCurrDir(currDir === "/" ? currDir + name : currDir + "/" + name);
      const breadCrumbString =
        currDir === "/" ? currDir + name : currDir + "/" + name;
      setBreadcrumbsList(("Home" + breadCrumbString).split("/"));
    });
  };

  return (
    <Box className={FOLDER_CARD_CN} sx={{ margin: "6px" }}>
      <Card
        onClick={() => getIntoFolderHandler(currDir, data.name)}
        className={classes.root}
      >
        <CardContent>
          <div>
            <img
              width="44"
              height="44"
              src="https://img.icons8.com/color/48/folder-invoices--v2.png"
              alt="folder-invoices--v2"
            />
          </div>
          <br></br>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: "#111927",
            }}
          >
            {data.name}
          </div>
          <Divider
            style={{ marginTop: "4px", marginBottom: "4px", opacity: 0.5 }}
          />
          <div style={{ fontSize: "12px" }}> File Size</div>
          <div style={{ fontSize: "14px", opacity: 0.5 }}>
            {" "}
            {data.size} Mb{" "}
            <img
              width="10"
              height="10"
              src="https://img.icons8.com/material-rounded/30/full-stop.png"
              alt="full-stop"
            />{" "}
            {data.counts} items{" "}
          </div>
          {/* {context.user} */}
          <div style={{ fontSize: "12px", opacity: 0.6, paddingTop:'4px' }}>
            Created at {isoToLocalDateString(data.createdAt)}{" "}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
