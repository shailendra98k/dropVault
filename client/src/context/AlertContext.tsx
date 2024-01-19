import { Alert } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { TSFixMe } from "../../types";
import { useDeviceContext } from "./DeviceContext";

export enum AlertSeverityEnum {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}
export interface AlertType {
  alertText: string;
  severity: AlertSeverityEnum;
  setAlertText: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<AlertSeverityEnum>>;
}

//@ts-ignore
const AlertContext: React.Context<AlertType> = React.createContext();

export function AlertContextProvider({ children }: TSFixMe) {
  const [alertText, setAlertText] = useState<string>("");
  const { isS, isM, isL } = useDeviceContext();
  const [severity, setSeverity] = useState<AlertSeverityEnum>(
    AlertSeverityEnum.SUCCESS
  );
  React.useEffect(() => {
    alertText &&
      setTimeout(() => {
        setAlertText("");
      }, 5000);
  }, [alertText]);

  return (
    <AlertContext.Provider
      value={{ alertText, severity, setAlertText, setSeverity }}
    >
      <div
        style={{
          margin: "auto",
          position: "absolute",
          top: isS || isM ? "42px" : "60px",
          right: "0px",
          zIndex: "2",
        }}
      >
        {alertText && (
          <Alert
            style={{
              margin: 2,
            }}
            severity={severity}
          >
            {alertText}
          </Alert>
        )}
      </div>

      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return React.useContext(AlertContext);
}
