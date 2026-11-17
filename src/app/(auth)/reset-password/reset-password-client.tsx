"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp || !password) {
      toast.add({
        title: "All Fields Required",
        description: "Please fill in all requested fields.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.add({
        title: "Passwords Mismatch",
        description: "Your new password and confirmation password do not match.",
        type: "error",
      });
      return;
    }

    if (password.length < 8) {
      toast.add({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        type: "error",
      });
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast.add({
        title: "Password Updated Successfully",
        description: "You can now log in using your new credentials.",
        type: "success",
      });
      router.push("/login");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field className="space-y-1.5">
        <FieldLabel htmlFor="email" className="text-xs font-semibold">
          Email Address
        </FieldLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl"
        />
      </Field>

      <Field className="space-y-1.5">
        <FieldLabel htmlFor="otp" className="text-xs font-semibold">
          6-Digit Verification Code
        </FieldLabel>
        <Input
          id="otp"
          type="text"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="rounded-xl tracking-widest text-center font-bold text-base"
        />
      </Field>

      <Field className="space-y-1.5">
        <FieldLabel htmlFor="new-password" className="text-xs font-semibold">
          New Secure Password
        </FieldLabel>
        <div className="relative">
          <Input
            id="new-password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pr-10 rounded-xl"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>

      <Field className="space-y-1.5">
        <FieldLabel htmlFor="confirm-new-password" className="text-xs font-semibold">
          Confirm New Password
        </FieldLabel>
        <Input
          id="confirm-new-password"
          type={showPassword ? "text" : "password"}
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="rounded-xl"
        />
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 py-5 text-sm mt-2"
      >
        {isPending ? (
          <>
            <Spinner />
            <span>Updating Password...</span>
          </>
        ) : (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-4" /> Set New Password
          </span>
        )}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/login"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Return to Sign In
        </Link>
      </div>
    </form>
  );
}
