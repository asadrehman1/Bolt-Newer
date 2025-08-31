"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const fullHeight = { height: "75vh" };

  return (
    <div>
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

      <SandpackProvider template="react" theme="dark">
        <SandpackLayout style={fullHeight}>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={fullHeight} />
              <SandpackCodeEditor style={fullHeight} />
            </>
          ) : (
            <>
              <SandpackPreview style={fullHeight} />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
