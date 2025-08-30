import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

function Header() {
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.png"} width={100} height={100} alt="Bolt Logo" />
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
    </div>
  );
}

export default Header;
