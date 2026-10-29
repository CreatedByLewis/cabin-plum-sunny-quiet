import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createDepositCheckout } from "@/lib/checkout";
import { formatGBP, type ExtraId, type PackageId } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PayDeposit({
  packageId,
  amount,
  email,
  extras,
  variant = "primary",
  className,
  dark = false,
}: {
  packageId: PackageId;
  amount: number;
  email?: string;
  extras?: ExtraId[];
  variant?: "primary" | "inverse";
  className?: string;
  dark?: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setPending(true);
    setError("");
    try {
      const result = await createDepositCheckout({ data: { packageId, email, extras } });
      if (result.url) {
        window.location.assign(result.url);
        return;
      }
      setError(result.message || "Checkout didn’t open.");
    } catch {
      setError("Checkout didn’t open.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button type="button" variant={variant} className="w-full" onClick={pay} disabled={pending}>
        {pending ? "Opening checkout…" : `Pay ${formatGBP(amount)} deposit`}
      </Button>
      {error ? (
        <p className={cn("text-sm", dark ? "text-paper/80" : "text-signal")} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
