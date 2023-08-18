import * as React from "react";
const UploadModalContext = React.createContext();

export function UploadModalContextProvider({ children }) {
    const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  

  return (
    <UploadModalContext.Provider value={{ isUploadModalOpen, setIsUploadModalOpen }}>
      {children}
    </UploadModalContext.Provider>
  );
}

export function useUploadModalContext() {
  return React.useContext(UploadModalContext);
}
