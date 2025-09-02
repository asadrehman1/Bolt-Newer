"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

export const useGoogleAuth = (onClose = () => {}) => {
  const { setAuthUser } = useAuth();
  const createUser = useMutation(api.users.createUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get Google profile
        const { data: user } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: "Bearer " + tokenResponse?.access_token },
          }
        );

        // Create or get user in Convex
        const convexUser = await createUser({
          name: user.name,
          email: user.email,
          picture: user.picture,
          uid: uuid4(),
        });
        localStorage.setItem("authUser", JSON.stringify(convexUser));
        setAuthUser(convexUser);

        onClose?.();
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: (errorResponse) =>
      console.error("Google OAuth error:", errorResponse),
  });

  return { googleLogin };
};
