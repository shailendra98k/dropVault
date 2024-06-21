import * as React from "react";

export const Footer = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "30px" }}>
      <footer style={{ width: "80%", margin: "auto", textAlign: "center" }}>
        <p>
          <a
            target={"_blank"}
            href="https://www.instagram.com/shailendra98k/"
            rel="noreferrer"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/color/48/instagram-new--v1.png"
              alt="instagram-new--v1"
              style={{ margin: "0px 10px" }}
            />
          </a>

          <a
            target={"_blank"}
            href="https://www.facebook.com/profile.php?id=100008108587246"
            rel="noreferrer"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/color/48/facebook-new.png"
              alt="facebook-new"
              style={{ margin: "0px 10px" }}
            />
          </a>

          <a
            target={"_blank"}
            href="https://www.linkedin.com/in/shailendra98k/"
            rel="noreferrer"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/color/48/linkedin.png"
              alt="linkedin"
              style={{ margin: "0px 10px" }}
            />
          </a>

          <a
            target={"_blank"}
            href="https://github.com/shailendra98k"
            rel="noreferrer"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/ios-filled/50/github.png"
              alt="github"
              style={{ margin: "0px 10px" }}
            />
          </a>
        </p>
      </footer>
    </div>
  );
};
