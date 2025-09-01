"use client";
import Lookup from "@/data/Lookup";
import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function PricingModal() {
  const { authUser, setAuthUser } = useAuth();
  const updateTokens = useMutation(api.users.updateTokens);
  const [selectedOption, setSelectedOption] = useState(null);
  const onPaymentSuccess = async () => {
    const token = authUser?.tokens + Number(selectedOption?.value);
    await updateTokens({
      id: authUser?._id,
      tokens: token,
    });
    setAuthUser(authUser);
  };
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((option, index) => (
        <div key={index} className="p-7 rounded-xl border flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{option.name}</h2>
          <h2 className="font-medium text-lg">{option.tokens} Tokens</h2>
          <p className="text-gray-400">{option.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            ${option.price}
          </h2>
          <PayPalButtons
            disabled={!authUser?.email}
            onClick={() => setSelectedOption(option)}
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("Cancelled")}
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: option.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default PricingModal;
