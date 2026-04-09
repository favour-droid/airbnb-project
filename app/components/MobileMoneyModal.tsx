"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { markReservationPaid } from "@/app/actions";

interface Props {
  homeId: string;
  price: number;
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

type Network = "mtn" | "orange" | null;
type Step = "form" | "processing" | "success";

function detectNetwork(phone: string): Network {
  const digits = phone.replace(/\D/g, "");
  const last9 = digits.slice(-9);
  const prefix3 = parseInt(last9.slice(0, 3));

  if (
    (prefix3 >= 650 && prefix3 <= 654) ||
    (prefix3 >= 670 && prefix3 <= 679) ||
    (prefix3 >= 680 && prefix3 <= 689)
  ) {
    return "mtn";
  }
  if (
    (prefix3 >= 655 && prefix3 <= 659) ||
    (prefix3 >= 690 && prefix3 <= 699) ||
    (prefix3 >= 620 && prefix3 <= 629)
  ) {
    return "orange";
  }
  return null;
}

export function MobileMoneyModal({
  homeId,
  price,
  userId,
  onClose,
  onSuccess,
}: Props) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState("");

  const network = detectNetwork(phone);

  async function handlePay() {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setError("Please enter a valid Cameroon phone number.");
      return;
    }
    if (!network) {
      setError("Could not detect network. Use an MTN or Orange number.");
      return;
    }
    setError("");
    setStep("processing");

    // Simulate processing delay — no external API needed
    await new Promise((res) => setTimeout(res, 2500));

    // Call server action directly to mark as paid in DB
    await markReservationPaid({ homeId, userId });

    setStep("success");

    setTimeout(() => {
      onSuccess();
    }, 1800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget && step === "form") onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">Mobile Money Payment</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Amount:{" "}
            <span className="font-bold text-black">
              {price.toLocaleString()} FCFA
            </span>
          </p>
        </div>

        <div className="p-5">
          {step === "form" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 677 123 456"
                    className="pl-9"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                {network === "mtn" && (
                  <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mt-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                    MTN Mobile Money detected
                  </span>
                )}
                {network === "orange" && (
                  <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mt-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                    Orange Money detected
                  </span>
                )}
                {phone.replace(/\D/g, "").length >= 9 && !network && (
                  <p className="text-xs text-red-500 mt-1">
                    Network not recognized. Try an MTN or Orange number.
                  </p>
                )}
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePay}
                  disabled={!network}
                  style={{
                    backgroundColor:
                      network === "mtn"
                        ? "#FCD116"
                        : network === "orange"
                        ? "#FF6600"
                        : undefined,
                    color: network ? "#000" : undefined,
                  }}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <div className="text-center">
                <p className="font-semibold">Processing Payment...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {network === "mtn"
                    ? "Waiting for MTN MoMo confirmation"
                    : "Waiting for Orange Money confirmation"}
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <div className="text-center">
                <p className="font-semibold text-lg">Payment Successful! 🎉</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your reservation is now confirmed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}