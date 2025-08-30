"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { authUser } = useAuth();
  return (
    <div className="px-8 flex justify-between items-center">
      <Image src={"/logo.avif"} width={100} height={100} alt="Bolt Logo" />
      {!authUser?.name ? (
        <div className="flex gap-3">
          <Button variant="ghost" className="cursor-pointer">
            Sign In
          </Button>
          <Button
            style={{
              backgroundColor: Colors.BLUE,
            }}
            className="cursor-pointer text-white"
          >
            Get Started
          </Button>
        </div>
      ) : (
        <Button
          style={{
            backgroundColor: Colors.BLUE,
          }}
          className="cursor-pointer text-white"
        >
          Logout
        </Button>
      )}
    </div>
  );
}

export default Header;
