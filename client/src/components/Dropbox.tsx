/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { AppContext } from "../App";
import { API_URI, BASE_URI } from "../constants";
import "./css/Dropbox.css";
import { useUploadModalContext } from "../context/UploadModalContext";
import { TSFixMe } from "../../types";
function Dropbox() {
  const { currDir, user } = React.useContext(AppContext);
  const [display, setDisplay] = React.useState("none");
  const { isUploadModalOpen, setIsUploadModalOpen } = useUploadModalContext();
  React.useEffect(() => {
    if (isUploadModalOpen) {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }, [isUploadModalOpen]);
  var totalData = 0;
  var dataSent = 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setTotalData(val: number) {
    totalData = val;
  }

  function fun(file : TSFixMe, flag: boolean) {
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
    console.log("New File Record is: ", newlyAddedFilesList, currDir);
    formData.append("user_id", user.id);
    formData.append("current_dir", currDir);
    formData.append("name", file.name);
    formData.append("size", file.size);
    // @ts-ignore
    formData.append("type", 0);

    axios
      .post(`${BASE_URI}/document-add/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress(e) {
          console.log("Loaded :", e.loaded);
          // @ts-ignore
          document.getElementById(metadata.name).value = e.loaded / e.total;
        },
      })
      .then((res) => {
        console.log("response aftre document upload from file server :", res);
        const data = {
          user_id: user.id,
          current_dir: currDir,
          name: file.name,
          size: file.size,
          type: 0,
          id: res.data.id,
        };

        axios
          .post(`${API_URI}/upload`, data)
          .then((res) => {
            console.log(
              "response aftre document upload from express server :",
              res
            );
          })
          .catch((err) => {
            console.log(
              "Error aftre document upload from express server :",
              err
            );
          });

        // props.setFiles([...props.files,...newlyAddedFilesList])
        // setDataSent(dataSent+metadata.size)
        // console.log("dataSent is: ",dataSent)
        // if(dataSent==totalData)props.setView("HOME")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const UploadFiles = React.useCallback(function (files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      fun(file, false);
    }
    console.log("Dtasent is ", dataSent, totalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UploadHandler = function () {
    // @ts-ignore
    const files = document.getElementById("fileElem").files;
    UploadFiles(files);
  };

  const previewHandler = React.useCallback(
    (param) => {
      console.log("Files is: ", param);
      const files =
        param.type !== "change"
          ? param
          // @ts-ignore
          : document.getElementById("fileElem").files;

      [...files].forEach((file) => {
        setTotalData(totalData + file.size);
        console.log("TotalData is: ", totalData);
        let divEle = document.createElement("div");
        let proEle = document.createElement("progress");
        let pEle = document.createElement("p");

        pEle.innerText = file.name;

        proEle.id = file.name;
        proEle.max = 1;
        proEle.value = 0;

        divEle.appendChild(pEle);
        divEle.appendChild(proEle);
        // @ts-ignore
        document.getElementById("preview").appendChild(divEle);
      });
      // @ts-ignore
      if (document.getElementById("fileElem").files.length)
        // @ts-ignore
        document.getElementById("submitBtn").classList.remove("disabled");
    },
    [setTotalData, totalData]
  );

  useEffect(() => {
    const dropArea = document.getElementById("drop-area");
    const preventDefaults = function (e: Event) {
      e.preventDefault();
      e.stopPropagation();
    };

    const unhighlight = function (e: Event) {
      dropArea?.classList.remove("highlight");
    };

    const highlight = function (e: Event) {
      dropArea?.classList.add("highlight");
    };

    const handleDrop = function (e: DragEvent) {
      let data = e.dataTransfer;
      let files = data?.files;
      previewHandler(files);
      UploadFiles(files);
    };

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea?.addEventListener(eventName, preventDefaults, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea?.addEventListener(eventName, unhighlight, false);
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea?.addEventListener(eventName, highlight, false);
    });
    dropArea?.addEventListener("drop", handleDrop, false);
  }, [UploadFiles, previewHandler]);

  return (
    <div id="dropbox-modal" style={{ display: display }}>
      <a
        style={{ float: "right", paddingRight: "10px", cursor: "pointer" }}
        onClick={() => {
          setIsUploadModalOpen(false);
        }}
      >
        X
      </a>
      <div id="drop-area">
        <form className="my-form">
          <p>
            Upload multiple files with the file dialog or by dragging and
            dropping images onto the dashed region
          </p>
          <input type="file" id="fileElem" multiple onChange={previewHandler} />

          <label className="button" htmlFor="fileElem">
            Select some files
          </label>

          <input
            type="button"
            id="submitBtn"
            className="button disabled"
            onClick={UploadHandler}
            value="Upload!"
          />
        </form>
      </div>
      <div id="preview"></div>
    </div>
  );
}

export default Dropbox;
