"use client";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSidebar } from "../ui/sidebar";

function WorkspaceHistory() {
  const { authUser } = useAuth();
  const convex = useConvex();
  const [workspaces, setWorkspaces] = React.useState([]);
  const {toggleSidebar} = useSidebar();

  const getAllWorkspaces = async () => {
    const workspaces = await convex.query(api.workspaces.getAllWorkspaces, {
      userId: authUser?._id,
    });
    setWorkspaces(workspaces);
  };

  useEffect(() => {
    if (authUser?._id) {
      getAllWorkspaces();
    }
  }, [authUser]);
  return (
    <div>
      <h2 className="font-medium text-lg">Chats</h2>
      <>
        {workspaces?.map((workspace, index) => (
          <Link href={`/workspace/${workspace?._id}`} key={index}>
            <h3 onClick={toggleSidebar} className="text-sm text-gray-400 my-3 font-light cursor-pointer hover:text-white">
              {workspace?.prompt[0]?.content}
            </h3>
          </Link>
        ))}
      </>
    </div>
  );
}

export default WorkspaceHistory;
