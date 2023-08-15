import * as React from "react";
import { AppContext } from "../../App";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@mui/material";
import { Box, Card } from "@material-ui/core";
import { BASE_URI } from "../../constants";
import axios from "axios";
import { FOLDER_CARD_CN } from "../../classNameConstant";

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

export default function FolderCard({ data, userid }) {
  console.log("data is:", data);
  const classes = useStyles();
  const { currDir, setCurrDir, setDirectories, setFiles, setBreadcrumbsList } =
    React.useContext(AppContext);

  const getIntoFolderHandler = (currDir, name) => {
    const formData = new FormData();
    formData.append(
      "current_dir",
      currDir === "/" ? currDir + name : currDir + "/" + name
    );
    formData.append("user_id", userid);
    axios.post(BASE_URI, formData).then((res) => {
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
    <Box className={FOLDER_CARD_CN} sx={{ margin: "6px", cursor: "pointer" }}>
      <Card
        onClick={() => getIntoFolderHandler(currDir, data.name)}
        className={classes.root}
      >
        <CardContent>
          <div>
            <i
              style={{ fontSize: "32px", color: "grey" }}
              class="fa fa-folder"
            ></i>
          </div>
          <br></br>
          <div>
            <b>{data.name}</b>
          </div>
          {/* {data.counts && <div><b>{data.counts} files</b></div>} */}
          {/* {context.user} */}
        </CardContent>
      </Card>
    </Box>
  );
}
