"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { Download } from "lucide-react";
import { useAction } from "@/context/ActionContext";
import { useAuth } from "@/context/AuthContext";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";
import { usePrompt } from "@/context/PromptContext";

function Header() {
  const { authUser } = useAuth();
  const { setAction } = useAction();
  const { activeTab } = usePrompt();
  const { googleLogin } = useGoogleAuth();

  const onActionClick = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };
  return (
    <div className="px-8 flex justify-between items-center">
      <Image src={"/logo.avif"} width={100} height={100} alt="Bolt Logo" />
      {!authUser?.name ? (
        <div className="flex gap-3">
          <Button
            onClick={googleLogin}
            style={{
              backgroundColor: Colors.BLUE,
            }}
            className="cursor-pointer text-white"
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          {activeTab === "preview" && (
            <Button
              onClick={() => onActionClick("export")}
              variant="secondary"
              className="cursor-pointer text-white"
            >
              <Download />
              Export
            </Button>
          )}
          <div className="flex gap-2 items-end">
            {authUser?.picture && (
              <Image
                src={authUser?.picture}
                width={35}
                height={35}
                alt="userImage"
                className="rounded-full my-2 cursor-pointer"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
