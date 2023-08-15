import React from "react";
import Box from "@mui/material/Box";
import { AppContext } from "../App";
import { BASE_URI } from "../constants";
import axios from "axios";
import FolderCard from "../components/card/FolderCard";
import FileCard from "../components/card/FileCard";
import { useHistory } from "react-router-dom";
import Dropbox from "../components/Dropbox";
import { ActionBar } from "../components/actionBar/ActionBar";

const Home = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      history.push("/sign-in");
    }
  }, [history]);
  return (
    <Box id={"home-container"} sx={{ display: "flex" }}>
      <ActionBar setIsOpen={setIsOpen} />
      <Body />
      <Dropbox isOpen={isOpen} setIsOpen={setIsOpen} />
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
    axios.post(BASE_URI, formData).then((res) => {
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
        {directories.map((dir) => {
          return <FolderCard data={dir} userid={user.id} />;
        })}
      </Box>

      <Box sx={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}>
        {files.map((file) => {
          return <FileCard data={file} />;
        })}
      </Box>
    </Box>
  );
};

export default Home;
