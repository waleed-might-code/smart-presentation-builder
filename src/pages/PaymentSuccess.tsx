
import React from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <Info className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Subscriptions Coming Soon</h1>
        <p className="text-muted-foreground mb-6">
          Subscription features are not yet available. For now, you can use all features for free.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate("/account")} variant="outline" className="w-full">
            Go to Account
          </Button>
          <Button onClick={() => navigate("/")} className="w-full">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
