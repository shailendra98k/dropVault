import * as React from "react";
import axios from "axios";
import { Breadcrumbs } from "@mui/material";
import { API_URI } from "../../constants";
import { Button } from "@mui/material";
import { useDefaultContext } from "../../context/DefaultContext";
import { useDeviceContext } from "../../context/DeviceContext";

export const DirBreadcrumbs = () => {
  const {
    breadcrumbsList,
    setCurrDir,
    user,
    setBreadcrumbsList,
    setFiles,
    setDirectories,
  } = useDefaultContext();

  const { isS } = useDeviceContext();
  var prefix = "";
  const changeDirectory = (path_uri: string) => {
    const formData = new FormData();
    formData.append("current_dir", path_uri);
    formData.append("user_id", user.id.toString());
    axios.post(API_URI, formData).then((res) => {
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
        height: "5vh",
        paddingLeft: isS ? "20px" : "0px",
      }}
    >
      {breadcrumbsList.map((item: string, index: number) => {
        let path_uri: string;
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
            size="medium"
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
