import React from "react";
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
  React.useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      history.push("/sign-in");
    }
  }, [history]);
  return (
    <Box id={"home-container"} sx={{ display: "flex" }}>
      <ActionBar/>
      <Body />
      <Dropbox/>
    </Box>
  );
};

const Body = () => {
  const { currDir, files, user, setFiles, directories, setDirectories } =
    React.useContext(AppContext);
  React.useEffect(() => {
    const formData = new FormData();
    formData.append("current_dir", currDir);
    formData.append("user_id", user.id);
    axios.post(API_URI, formData).then((res) => {
      console.log("Daat received:", res);
      setDirectories(res.data.sub_dirs);
      setFiles(res.data.files);
    });
  }, [currDir, setDirectories, setFiles, user.id]);
  React.useEffect(() => {
    console.log("Curr Dir is:", currDir);
    console.log("User is:", user);
  });

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
