import { Button } from "@mui/material";

import React from "react";
import { useDeviceContext } from "../context/DeviceContext";

const Home = () => {
  const { isS, isM, isL } = useDeviceContext();
  
  return (
    <>
      <div
        style={{
          paddingTop: "50px",
          display: "grid",
          gridTemplateColumns: isS || isM ? "100%" : "50% 50%",
        }}
      >
        <div style={{ padding: isS || isM ? '20px':  "90px", textAlign:'center' }}>
          <h1 style={{ fontSize: isS || isM ? '50px':"80px", color: "#202124", fontWeight: 300 }}>
            Easy and secure access to your content
          </h1>
          <h3 style={{ fontWeight: 200, fontSize: "20px", color: "#5f6368" }}>
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </h3>
          <Button
            sx={{
              padding: "8px 16px 8px 16px",
              fontSize: "16px",
              marginTop: "20px",
            }}
            variant="contained"
            href="./drive"
          >
            GO TO Vault
          </Button>
        </div>
        <div style={{padding: isS || isM ? '20px': "90px" }}>
          <img src="./screenshots/home-dir-desktop.png" alt="im" width={ isS || isM ? 400: 600} />
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Home;
