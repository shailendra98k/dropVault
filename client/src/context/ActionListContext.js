import * as React from "react";
const ActionListContext = React.createContext();

export function ActionListContextProvider({ children }) {
    const [isActionListOpen, setIsActionListOpen] = React.useState(false);
  

  return (
    <ActionListContext.Provider value={{ isActionListOpen, setIsActionListOpen }}>
      {children}
    </ActionListContext.Provider>
  );
}

export function useActionListContext() {
  return React.useContext(ActionListContext);
}
