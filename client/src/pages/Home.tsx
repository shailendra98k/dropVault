import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { API_URI, SESSION_ITEMS, URL_PATHS } from "../constants";
import axios from "axios";
import FolderCard from "../components/card/FolderCard";
import FileCard from "../components/card/FileCard";
import { useHistory } from "react-router-dom";
import Dropbox from "../components/Dropbox";
import { ActionBar } from "../components/actionBar/ActionBar";
import { TSFixMe } from "../../types";
import { useDefaultContext } from "../context/DefaultContext";
import { useUploadModalContext } from "../context/UploadModalContext";
import { DirBreadcrumbs } from "../components/breadcrumbs/Breadcrump";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "95vh",
    paddingTop: "60px",
    "@media (max-width: 840px)": {
      flexDirection: "column",
    },
  },
});

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const { currDir, user, setFiles, setDirectories } = useDefaultContext();
  const { isUploadModalOpen } = useUploadModalContext();

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_ITEMS.USER)) {
      history.push(URL_PATHS.SIGN_IN);
    } else {
      const formData = new FormData();
      formData.append("current_dir", currDir);
      formData.append("user_id", user?.id.toString());
      axios.post(API_URI, formData).then((res) => {
        setDirectories(res.data.sub_dirs);
        setFiles(res.data.files);
      });
    }
  }, [currDir, history, setDirectories, setFiles, user?.id, isUploadModalOpen]);

  return (
    <>
      <Box className={classes.container}>
        <ActionBar />
        <Body />
        <Dropbox />
      </Box>
    </>
  );
};

const Body = () => {
  const { files, user, directories } = useDefaultContext();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DirBreadcrumbs />
      <Box style={{ flexGrow: 4, height: "90vh", overflow: "scroll" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {directories.map((dir: TSFixMe) => {
            return <FolderCard data={dir} userid={user.id.toString()} />;
          })}
        </Box>

        <Box sx={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}>
          {files.map((file: TSFixMe) => {
            return <FileCard data={file} />;
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
