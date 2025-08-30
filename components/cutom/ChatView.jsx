"use client";
import { usePrompt } from "@/context/PromptContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { prompt, setPrompt } = usePrompt();

  const getWorkSpaceData = async () => {
    const workspace = await convex.query(api.workspaces.getWorkspace, {
      id,
    });
    setPrompt(workspace?.prompt);
  };

  useEffect(() => {
    if (id) {
      getWorkSpaceData();
    }
  }, [id]);

  return <div>ChatView</div>;
}

export default ChatView;
