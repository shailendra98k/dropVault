import * as React from "react";
import { useBreakpoint } from "../hooks/useBreakpoints";
const DeviceContext = React.createContext();

export function DeviceContextProvider({ children }) {
  const [isS, isM, isL] = useBreakpoint();
  

  return (
    <DeviceContext.Provider value={{ isS, isM, isL }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDeviceContext() {
  return React.useContext(DeviceContext);
}
