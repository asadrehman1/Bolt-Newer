"use client";
import { createContext, useContext, useState } from "react";

const ActionContext = createContext();

const ActionContextProvider = ({ children }) => {
  const [action, setAction] = useState(null);
  return (
    <ActionContext.Provider
      value={{
        action,
        setAction,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error("useAction must be used within a ActionContextProvider");
  }
  return context;
};

export { ActionContextProvider };
