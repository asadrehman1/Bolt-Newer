"use client";

import { createContext, useContext, useState } from "react";

const PromptContext = createContext();

const PromptContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState({});
  return (
    <PromptContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};
const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompt must be used within a PromptContextProvider");
  }
  return context;
};

export { PromptContextProvider, usePrompt };
