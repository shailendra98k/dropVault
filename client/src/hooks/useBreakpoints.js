import * as React from "react";

export const useBreakpoint = () => {
  const [isS, setIsS] = React.useState(false);
  const [isM, setIsM] = React.useState(false);
  const [isL, setIsL] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(null);
  React.useEffect(()=>{
    window.addEventListener('resize', function(event) {
        setScreenWidth(this.window.innerWidth);
    });
  })

  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
    if (screenWidth >= 912) {
        setIsL(true);
        setIsM(false);
        setIsS(false);
    }
    else if (screenWidth >= 512) {
        setIsL(false);
        setIsM(true);
        setIsS(false);
    }
    else {
        setIsL(false);
        setIsM(false);
        setIsS(true);
    }
  }, [screenWidth]);

  return [isS, isM, isL];
};
