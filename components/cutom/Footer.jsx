import { LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function Footer() {
  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "My Subscription",
      icon: Wallet,
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];
  return (
    <div className="px-2 mb-10">
      {options.map((option, index) => (
        <Button variant="ghost" key={index} className="w-full flex justify-start cursor-pointer my-3">
          <option.icon />
          <p>{option.name}</p>
        </Button>
      ))}
    </div>
  );
}

export default Footer;
