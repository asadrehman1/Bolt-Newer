"use client";
import { useAuth } from "@/context/AuthContext";
import { usePrompt } from "@/context/PromptContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";


function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { prompt, setPrompt } = usePrompt();
  const { authUser } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getWorkSpaceData = async () => {
    const workspace = await convex.query(api.workspaces.getWorkspace, {
      id,
    });
    setPrompt(workspace?.prompt);
  };

  const getAIResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(prompt) + Prompt.CHAT_PROMPT;
    const response = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    setPrompt((prev) => [
      ...prev,
      { role: "ai", content: response.data.result },
    ]);
    setLoading(false);
  };

  const onGenerate = async (userInput) => {
    setPrompt(prev => [...prev, { role: "user", content: userInput }]);
  };

  useEffect(() => {
    if (prompt.length > 0) {
      const role = prompt[prompt.length - 1].role;
      if (role === "user") {
        // getAIResponse();
      }
    }
  }, [prompt]);
  useEffect(() => {
    if (id) {
      getWorkSpaceData();
    }
  }, [id]);

  return (
    <div className="relative h-[80vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {prompt.map((prompt, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-6"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {prompt.role === "user" && (
              <Image
                src={authUser?.picture}
                width={35}
                height={35}
                alt="userImage"
                className="rounded-full"
              />
            )}
            <div className="prose prose-lg max-w-none">
              <div className="reset-tw">
                <Markdown>{prompt.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>
      {/* Input Section */}
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
    </div>
  );
}

export default ChatView;
