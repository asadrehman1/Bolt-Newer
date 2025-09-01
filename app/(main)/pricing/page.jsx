"use client";
import PricingModal from "@/components/cutom/PricingModal";
import { useAuth } from "@/context/AuthContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import React from "react";

function page() {
  const {authUser} = useAuth();
  return (
    <div className="mt-10 flex flex-col items-center p-10 md:px-32 lg:px-48">
      <h2 className="font-bold text-5xl">Pricing</h2>
      <p className="text-gray-400 mt-4 max-w-xl text-center">
        {Lookup.PRICING_DESC}
      </p>
      <div className="p-5 border rounded-xl w-full flex justify-between mt-7 items-center"
      style={{
        backgroundColor: Colors.BACKGROUND,
      }}>
        <h2 className="text-lg">
          <span className="font-bold">{authUser?.tokens} Tokens Left</span>
        </h2>
        <div>
          <h2 className="font-medium">Need more tokens?</h2>
          <p className="text-gray-400">
            Update your subscription to get more tokens.
          </p>
        </div>
      </div>
      <PricingModal />
    </div>
  );
}

export default page;
