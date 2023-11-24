import * as React from "react";
import { TSFixMe } from "../../types";
import { useBreakpoint } from "../hooks/useBreakpoints";

interface DeviceContextType {
  isS: boolean;
  isM: boolean;
  isL: boolean;
}

//@ts-ignore
const DeviceContext: React.Context<DeviceContextType> = React.createContext();

export function DeviceContextProvider({ children }: TSFixMe) {
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
