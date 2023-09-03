import * as React from "react";

export const useBreakpoint = () => {
  const [isS, setIsS] = React.useState<boolean>(false);
  const [isM, setIsM] = React.useState<boolean>(false);
  const [isL, setIsL] = React.useState<boolean>(false);
  const [screenWidth, setScreenWidth] = React.useState<number>(0);
  React.useEffect(() => {
    window.addEventListener("resize", function (event) {
      setScreenWidth(this.window.innerWidth);
    });
  });

  React.useEffect(() => {
    setScreenWidth(window.innerWidth as number);
    if (screenWidth >= 912) {
      setIsL(true);
      setIsM(false);
      setIsS(false);
    } else if (screenWidth >= 512) {
      setIsL(false);
      setIsM(true);
      setIsS(false);
    } else {
      setIsL(false);
      setIsM(false);
      setIsS(true);
    }
  }, [screenWidth]);

  return [isS, isM, isL];
};
