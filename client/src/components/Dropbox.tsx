/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import axios from "axios";
import { API_URI, BASE_URI } from "../constants";
import { useUploadModalContext } from "../context/UploadModalContext";
import { TSFixMe } from "../../types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDefaultContext } from "../context/DefaultContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Dropbox() {
  const { currDir, user, files, setFiles } = useDefaultContext();
  const { isUploadModalOpen, setIsUploadModalOpen } = useUploadModalContext();
  const handleClose = () => setIsUploadModalOpen(false);
  var totalData = 0;
  function setTotalData(val: number) {
    totalData = val;
  }

  function uploadSingleFile(file: TSFixMe, flag: boolean) {
    var newlyAddedFilesList = [];
    const formData = new FormData();
    file["id"] = Date.now();
    file["date"] = new Date().toLocaleDateString();
    formData.append("file", file);
    var metadata = {
      name: file.name,
      size: file.size,
      type: "file",
    };
    newlyAddedFilesList.push(metadata);
    formData.append("user_id", user.id.toString());
    formData.append("current_dir", currDir);
    formData.append("name", file.name);
    formData.append("size", file.size);
    // @ts-ignore
    formData.append("type", 0);

    /**
     * File upload is done in 2 steps:
     * First, the file is uploaded to the file-server, which returns the id of that file object
     * In the next step, that id is sent along with other data, as request object to add-document
     * endpoint. This simply adds that file to the respective user
     */

    axios
      .post(`${BASE_URI}/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress(e) {
          // @ts-ignore
          document.getElementById(metadata.name).value = e.loaded / e.total;
        },
      })
      .then((res) => {
        const data = {
          user_id: user.id,
          current_dir: currDir,
          name: file.name,
          size: file.size,
          type: 0,
          id: res.data.id,
        };

        axios
          .post(`${API_URI}/add-document`, data)
          .then((res) => {
            console.log(
              "response aftre document upload from express server :",
              res
            );

            setFiles([
              ...files,
              { filename: data.name, id: data.id, type: "0" },
            ]);
          })
          .catch((err) => {
            console.log(
              "Error aftre document upload from express server :",
              err
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const previewHandler = (param: { type: string }) => {
    //@ts-ignore
    const files = document.getElementById("fileElem").files;
    document.getElementById("fileElem")?.setAttribute("disabled", "true");
    [...files].forEach((file) => {
      setTotalData(totalData + file.size);
      let divEle = document.createElement("div");
      let proEle = document.createElement("progress");
      let pEle = document.createElement("p");

      pEle.innerText = file.name;

      proEle.id = file.name;
      proEle.max = 1;
      proEle.value = 0;
      divEle.appendChild(pEle);
      divEle.appendChild(proEle);

      document.getElementById("preview")?.appendChild(divEle);
      uploadSingleFile(file, false);
    });
  };

  return (
    <div>
      <Modal
        open={isUploadModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{}}
          >
            Upload file
            <VisuallyHiddenInput
              id="fileElem"
              onChange={previewHandler}
              type="file"
            />
          </Button>
          <div
            style={{ position: "relative", bottom: "-100px" }}
            id="preview"
          ></div>
        </Box>
      </Modal>
    </div>
  );
}
