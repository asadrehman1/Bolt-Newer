import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";

function SignInDialog({ open, onClose }) {
  const { googleLogin } = useGoogleAuth(onClose);
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
