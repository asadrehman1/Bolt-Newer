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
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer "+tokenResponse?.access_token } }
      );
      const user = userInfo?.data;
      const convexUser = await createUser({
        name: userInfo.data.name,
        email: userInfo.data.email,
        picture: userInfo.data.picture,
        uid: uuid4(),
      });

      localStorage.setItem("authUser", JSON.stringify(convexUser));
      setAuthUser(convexUser);
      onClose?.();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return { googleLogin };
};
