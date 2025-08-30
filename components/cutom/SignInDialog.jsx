import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ open, onClose }) {
  const { setAuthUser } = useAuth();
  const createUser = useMutation(api.users.createUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, "tokenResponse");
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer "+tokenResponse?.access_token } }
      );
      const user = userInfo?.data;
      await createUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if(typeof window !== "undefined") {
        localStorage.setItem("authUser", JSON.stringify(user));
      }
      setAuthUser(userInfo?.data);
      onClose();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] w-[90%] h-[350px]">
        <DialogHeader>
          <DialogTitle />
          <div className="flex flex-col items-center justify-center gap-3 h-full">
            <p className="font-bold text-center text-2xl text-white">
              {Lookup.SIGNIN_HEADING}
            </p>
            <p className="mt-2 text-center text-gray-400">
              {Lookup.SIGNIN_SUBHEADING}
            </p>
            <Button
              onClick={googleLogin}
              className="bg-blue-500 text-white hover:bg-blue-400 my-2"
            >
              Sign In with Google
            </Button>
            <p className="text-xs text-gray-400">
              {Lookup.SIGNIn_AGREEMENT_TEXT}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
