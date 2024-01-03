import React from "react";

export const FileBasedIcon = ({ filename }: { filename: string }) => {
  const fileType = filename.split(".").slice(-1)[0];
  console.log("Fiele tye is: ", fileType);
  const fileNameToTypeDict = {
    pdf: "https://img.icons8.com/color/32/adobe-acrobat--v1.png",
    jpeg: "https://img.icons8.com/fluency/32/image-file.png",
    mp4: "https://img.icons8.com/cute-clipart/32/video-file.png",
    xlsx: "https://img.icons8.com/color/48/ms-excel.png",
    csv: "https://img.icons8.com/arcade/32/csv.png",
    txt: "https://img.icons8.com/arcade/64/txt.png",
    doc: "https://img.icons8.com/color/48/google-docs.png",
    undefined: "https://img.icons8.com/arcade/64/file.png",
  };

  const getIconUrl = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return fileNameToTypeDict.pdf;
      case "jpeg":
        return fileNameToTypeDict.jpeg;
      case "jpg":
        return fileNameToTypeDict.jpeg;
      case "mp4":
        return fileNameToTypeDict.mp4;
      case "mov":
        return fileNameToTypeDict.mp4;
      case "xlsx":
        return fileNameToTypeDict.xlsx;
      case "csv":
        return fileNameToTypeDict.csv;
      case "txt":
        return fileNameToTypeDict.txt;
      case "doc":
        return fileNameToTypeDict.doc;
      default:
        return fileNameToTypeDict.undefined;
    }
  };

  return (
    <img width="44" height="44" src={getIconUrl(fileType)} alt="file-icon" />
  );
};
