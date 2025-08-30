import ChatView from "@/components/cutom/ChatView";
import CodeView from "@/components/cutom/CodeView";
import React from "react";

function WorkSpace() {
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ChatView />
        <div className="col-span-2">
          <CodeView />
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
