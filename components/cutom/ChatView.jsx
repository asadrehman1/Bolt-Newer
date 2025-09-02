"use client";
import { useAuth } from "@/context/AuthContext";
import { usePrompt } from "@/context/PromptContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Markdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";

export const countTokens = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};
function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { prompt, setPrompt } = usePrompt();
  const { authUser, setAuthUser } = useAuth();
  const scrollEndRef = useRef(null);
  const updateWorkspace = useMutation(api.workspaces.updateWorkspace);
  const { toggleSidebar } = useSidebar();
  const updateTokens = useMutation(api.users.updateTokens);

  useEffect(() => {
    if (!scrollEndRef.current && !prompt.length) return;
    setTimeout(() => {
      if (scrollEndRef.current) {
        scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [prompt]);

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getWorkSpaceData = async () => {
    try {
      const workspace = await convex.query(api.workspaces.getWorkspace, {
        id,
      });
      setPrompt(workspace?.prompt);
    } catch (error) {
      console.error("❌ Error fetching workspace data:", error);
      toast("Failed to fetch workspace data");
    }
  };

  const getAIResponse = async () => {
    if (loading) return; // prevent duplicate calls
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(prompt) + Prompt.CHAT_PROMPT;
      const response = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });

      const aiResponse = { role: "ai", content: response.data.result };

      // Add AI response
      setPrompt((prev) => [...prev, aiResponse]);

      // Token logic
      const tokens =
        Number(authUser?.tokens) - countTokens(JSON.stringify(aiResponse));
      await updateTokens({
        id: authUser?._id,
        tokens,
      });
      setAuthUser((prev) => ({
        ...prev,
        tokens,
      }));

      // Update workspace
      await updateWorkspace({
        prompt: [...prompt, aiResponse],
        id,
      });
    } catch (error) {
      console.error("❌ Error generating AI response:", error);
      toast("Failed to generate AI response. Try again.");
    } finally {
      setLoading(false);
    }
  };


  const onGenerate = async (userInput) => {
    if(authUser?.tokens < 10) {
      toast('You dont have enough tokens to generate AI responses');
      return;
    }
    setPrompt((prev) => [...prev, { role: "user", content: userInput }]);
    setUserInput("");
  };

  useEffect(() => {
    if (prompt.length > 0) {
      const lastMessage = prompt[prompt.length - 1];
      if (lastMessage.role === "user" && !loading) {
        getAIResponse();
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
            {prompt.role === "user" && authUser?.picture && (
              <Image
                src={authUser.picture}
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
        {/* <div ref={scrollEndRef}></div> */}
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
        </div>
      </div>
      <div className="flex gap-2 items-end">
        {authUser?.picture && (
          <Image
            onClick={toggleSidebar}
            src={authUser.picture}
            width={35}
            height={35}
            alt="userImage"
            className="rounded-full my-2"
          />
        )}
      </div>
    </div>
  );
}

export default ChatView;
