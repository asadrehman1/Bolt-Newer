"use client";
import React, { useState } from "react";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import Colors from "@/data/Colors";
import { useAuth } from "@/context/AuthContext";
import SignInDialog from "./SignInDialog";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

function Hero() {
  const { authUser } = useAuth();
  const createWorkspace = useMutation(api.workspaces.createWorkspace);
  const router = useRouter();

  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const onGenerate = async (userInput) => {
    if (!authUser?.name) {
      setOpenDialog(true);
      return;
    }
    const prompt = {
      role: "user",
      content: userInput,
    };
    const workspaceId = await createWorkspace({
      prompt: [prompt],
      user: authUser?._id,
    });
    console.log(workspaceId);
    router.push(`/workspace/${workspaceId}`);
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2 sm:px-4">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

      <div className="p-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 mt-3 max-w-xl w-full">
        <div
          className="p-5 rounded-xl"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex mt-8 flex-wrap max-w-2xl justify-center gap-3">
        {" "}
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => onGenerate(suggestion)}
            key={index}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
          >
            {suggestion}
          </h2>
        ))}{" "}
      </div>
      <SignInDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default Hero;
