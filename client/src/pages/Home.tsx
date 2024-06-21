import { Button } from "@mui/material";

import React from "react";
import { Footer } from "../components/footer/Footer";
import { HomaPageHeader } from "../components/header/HomePageHeader";
import { useDeviceContext } from "../context/DeviceContext";

const Home = () => {
  const { isS, isM, isL } = useDeviceContext();

  return (
    <>
      <HomaPageHeader />
      <div
        id="overview"
        style={{
          paddingTop: isS || isM ? "80px" : "32px",
          display: "grid",
          gridTemplateColumns: isS || isM ? "100%" : "100%",
          textAlign: "center",
        }}
      >
        <div style={{ padding: isS || isM ? "32px" : "90px" }}>
          <h1
            style={{
              fontSize: isS || isM ? "50px" : "80px",
              color: "#202124",
              fontWeight: 300,
              margin: "20px 0px",
            }}
          >
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
              marginTop: "48px",
            }}
            variant="contained"
            href="./drive"
          >
            GO TO Vault
          </Button>
          <div
            style={{
              color: "#5f6368",
              fontWeight: 300,
              paddingTop: "64px",
            }}
          >
            Don't have an account?{" "}
            <a href="/sign-up">
              <span style={{ fontWeight: 400 }}>Sign up at no cost</span>
            </a>
          </div>
        </div>
        {/* <div style={{ padding: isS || isM ? "20px" : "90px" }}>
          <img
            src="./screenshots/home-dir-desktop.png"
            alt="im"
            width={isS || isM ? 400 : 600}
          />
        </div> */}
      </div>

      <div id='feature'>
        <div
          style={{
            width: isS || isM ? "90%" : "80%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: isS || isM ? "32px" : "40px",
              color: "#202124",
              fontWeight: 300,
              width: "80%",
              margin: "auto",
              padding: "60px 0px 60px 0px",
            }}
          >
            Why DropVault ?
          </h3>
          <div
            style={{
              display: isS || isM ? "flex" : "block",
              flexDirection: "column",
              marginBottom:'20px'
            }}
          >
            <img
              src="images/1.png"
              alt=""
              width={isS || isM ? "90%" : "40%"}
            ></img>
            <span
              style={{
                fontWeight: 200,
                fontSize: "20px",
                color: "#5f6368",
                padding: isS || isM ? "10px" : "20px 10px",
                display: isS || isM ? "block" : "inline",
              }}
            >
              Store your file securely over cloud
            </span>
          </div>
          <div
            style={{
              display: isS || isM ? "flex" : "block",
              flexDirection: "column-reverse",
              marginBottom:'20px'
            }}
          >
            <span
              style={{
                fontWeight: 200,
                fontSize: "20px",
                color: "#5f6368",
                padding: isS || isM ? "10px" : "20px 10px",
                display: isS || isM ? "block" : "inline",
              }}
            >
              Quickly upload your files and access them from anywhere
            </span>
            <img
              src="images/2.png"
              alt=""
              width={isS || isM ? "90%" : "40%"}
            ></img>
          </div>
          <div
            style={{
              display: isS || isM ? "flex" : "block",
              flexDirection: "column",
              marginBottom:'20px'
            }}
          >
            <img
              src="images/3.png"
              alt=""
              width={isS || isM ? "90%" : "40%"}
            ></img>
            <span
              style={{
                fontWeight: 200,
                fontSize: "20px",
                color: "#5f6368",
                padding: isS || isM ? "10px" : "20px 10px",
                display: isS || isM ? "block" : "inline",
              }}
            >
              Share files securely with friends and family
            </span>
          </div>
          <div
            style={{
              display: isS || isM ? "flex" : "block",
              flexDirection: "column-reverse",
              marginBottom:'20px'
            }}
          >
            <span
              style={{
                fontWeight: 200,
                fontSize: "20px",
                color: "#5f6368",
                padding: isS || isM ? "10px" : "20px 10px",
                display: isS || isM ? "block" : "inline",
              }}
            >
              Intuitive design for a seamless user experience.
            </span>
            <img
              src="images/4.png"
              alt=""
              width={isS || isM ? "90%" : "40%"}
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
