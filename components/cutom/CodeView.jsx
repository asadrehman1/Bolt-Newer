"use client";
import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { usePrompt } from "@/context/PromptContext";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const [loading, setLoading] = useState(false);
  const fullHeight = { height: "75vh" };
  const { prompt } = usePrompt();
  const updateProjectFiles = useMutation(api.workspaces.updateProjectFiles);
  const convex = useConvex();

  const getWorkSpaceData = async () => {
    setLoading(true);
    try {
      const workspace = await convex.query(api.workspaces.getWorkspace, {
        id,
      });
      const mergedFiles = { ...Lookup?.DEFAULT_FILE, ...workspace?.fileData };
      setFiles(mergedFiles);
    } catch (error) {
      console.error("❌ Error fetching workspace data:", error);
      throw new Error("Failed to fetch workspace data");
    } finally {
      setLoading(false);
    }
  };

  const generateAICode = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(prompt) + " " + Prompt.CODE_GEN_PROMPT;
      const response = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });

      const mergedFiles = { ...Lookup?.DEFAULT_FILE, ...response?.data?.files };
      setFiles(mergedFiles);

      await updateProjectFiles({
        id,
        files: response?.data?.files,
      });
    } catch (error) {
      console.error("❌ Error generating AI code:", error);
      throw new Error("Failed to generate AI code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getWorkSpaceData();
    }
  }, [id]);

  useEffect(() => {
    if (prompt.length > 0) {
      const role = prompt[prompt.length - 1].role;
      if (role === "user") {
        generateAICode();
      }
    }
  }, [prompt]);

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center justify-center gap-3 bg-black p-1 w-[160px] rounded-full">
          {["code", "preview"].map((tab) => (
            <h2
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm cursor-pointer px-3 py-1 rounded-full transition-colors duration-200
          ${
            activeTab === tab
              ? "text-blue-500 bg-blue-500/25"
              : "text-gray-300 hover:bg-white/10"
          }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </h2>
          ))}
        </div>
      </div>

      <SandpackProvider
        template="react"
        theme="dark"
        files={files}
        customSetup={{
          dependencies: {
            ...Lookup?.DEPENDANCY,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout style={fullHeight}>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={fullHeight} />
              <SandpackCodeEditor style={fullHeight} />
            </>
          ) : (
            <>
              <SandpackPreview style={fullHeight} showNavigator={true} />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div
          className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex 
      items-center justify-center"
        >
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating Code...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
