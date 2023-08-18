import * as React from "react";
import axios from "axios";
import { Breadcrumbs } from "@mui/material";
import { BASE_URI } from "../../constants";
import { Button } from "@mui/material";
import { AppContext } from "../../App";

export const DirBreadcrumbs = () => {
  const {
    breadcrumbsList,
    setCurrDir,
    user,
    setBreadcrumbsList,
    setFiles,
    setDirectories,
  } = React.useContext(AppContext);
  var prefix = "";
  const changeDirectory = (path_uri) => {
    const formData = new FormData();
    formData.append("current_dir", path_uri);
    formData.append("user_id", user.id);
    axios.post(BASE_URI, formData).then((res) => {
      setDirectories(res.data.sub_dirs);
      setFiles(res.data.files);
      setCurrDir(path_uri);
      const breadCrumbString = path_uri === "/" ? "" : path_uri;
      setBreadcrumbsList(("Home" + breadCrumbString).split("/"));
    });
  };
  return (
    <Breadcrumbs
      separator="/"
      aria-label="breadcrumb"
      style={{
        padding: "20px",
        position: "fixed",
        top: "16px",
        paddingTop: "0px",
      }}
    >
      {breadcrumbsList.map((item, index) => {
        let path_uri;
        if (index === 0) {
          path_uri = "/";
        } else if (index === 1) {
          path_uri = "/" + item;
          prefix = path_uri;
        } else {
          path_uri = prefix + "/" + item;
          prefix = path_uri;
        }

        return (
          <Button
            size="large"
            id={path_uri}
            onClick={() => {
              changeDirectory(path_uri);
            }}
          >
            {item}
          </Button>
        );
      })}
    </Breadcrumbs>
  );
};
