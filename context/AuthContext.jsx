"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/cutom/LoadingSpinner";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [loading, setLoading] = useState(true);
  const convex = useConvex();
  const router = useRouter();
  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("authUser");
      if (!storedUser) {
        setAuthUser(null);
        setLoading(false);
        router.push("/");
        return;
      }

      const user = JSON.parse(storedUser);
      try {
        const result = await convex.query(api.users.getUser, {
          email: user?.email,
        });
        setAuthUser(result ?? null);
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
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
