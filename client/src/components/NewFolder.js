import React from "react";

function NewFolder() {
  // eslint-disable-next-line no-unused-vars
  const onClickHandler = () => {
    const dir = __dirname + "server/upload/vid.mkv";
    fetch(`http://localhost/download${dir}`)
      .then((resp) => resp.blob())
      .then((blob) => {
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = "00.mkv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        //  alert('your file has downloaded!');
      })
      .catch(() => alert("oh no!"));
  };

  return (
    <div>
      <button>New Folder </button>
    </div>
  );
}

export default NewFolder;
