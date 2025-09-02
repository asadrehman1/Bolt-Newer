"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/cutom/LoadingSpinner";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // 🚀 Initialize directly from localStorage if available
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("authUser") : null;

  const [authUser, setAuthUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [loading, setLoading] = useState(!storedUser);
  const convex = useConvex();
  const router = useRouter();

  const validateUser = async (user) => {
    try {
      const result = await convex.query(api.users.getUser, {
        email: user?.email,
      });

      if (result) {
        setAuthUser(result);
        localStorage.setItem("authUser", JSON.stringify(result));
      } else {
        setAuthUser(null);
        localStorage.removeItem("authUser");
        router.push("/");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthUser(null);
      localStorage.removeItem("authUser");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.email) {
      validateUser(authUser);
    } else {
      setLoading(false);
    }
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
