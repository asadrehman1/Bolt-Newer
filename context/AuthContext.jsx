"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const convex = useConvex();
  const isAuthenticated = async() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("authUser"));
      const result = await convex.query(api.users.getUser, {
        email: user?.email,
      }); 
      setAuthUser(result);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuth };
