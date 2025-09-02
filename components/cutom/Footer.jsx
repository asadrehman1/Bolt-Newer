"use client";
import { LogOut, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "../ui/sidebar";

function Footer() {
  const router = useRouter();
  const { setAuthUser } = useAuth();
    const { toggleSidebar } = useSidebar();

  const options = [
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
      action: "logout",
    },
  ];

  const onOptionClick = (option) => {
    if (option.action === "logout") {
      localStorage.removeItem("authUser");
      setAuthUser(null);
      toggleSidebar();
      router.push("/");
    } else if (option.path) {
      router.push(option.path);
    }
  };

  return (
    <div className="px-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          variant="ghost"
          key={index}
          className="w-full flex justify-start cursor-pointer my-3"
        >
          <option.icon className="mr-2" />
          <p>{option.name}</p>
        </Button>
      ))}
    </div>
  );
}

export default Footer;
