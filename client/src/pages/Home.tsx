import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { AppContext } from "../App";
import { API_URI, SESSION_ITEMS, URL_PATHS } from "../constants";
import axios from "axios";
import FolderCard from "../components/card/FolderCard";
import FileCard from "../components/card/FileCard";
import { useHistory } from "react-router-dom";
import Dropbox from "../components/Dropbox";
import { ActionBar } from "../components/actionBar/ActionBar";
import { TSFixMe } from "../../types";

const Home = () => {
  const history = useHistory();
  const { currDir, user, setFiles, setDirectories } = useContext(AppContext);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_ITEMS.USER)) {
      history.push(URL_PATHS.SIGN_IN);
    } else {
      const formData = new FormData();
      formData.append("current_dir", currDir);
      formData.append("user_id", user?.id);
      axios.post(API_URI, formData).then((res) => {
        setDirectories(res.data.sub_dirs);
        setFiles(res.data.files);
      });
    }
  },[currDir, history, setDirectories, setFiles, user?.id]);

  return (
    <Box id={"home-container"} sx={{ display: "flex" }}>
      <ActionBar />
      <Body />
      <Dropbox />
    </Box>
  );
};

const Body = () => {
  const { files, user, directories } = useContext(AppContext);

  return (
    <Box style={{ flexGrow: 4, height: "90vh", overflow: "scroll" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {directories.map((dir: TSFixMe) => {
          return <FolderCard data={dir} userid={user.id} />;
        })}
      </Box>

      <Box sx={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}>
        {files.map((file: TSFixMe) => {
          return <FileCard data={file} />;
        })}
      </Box>
    </Box>
  );
};

export default Home;
