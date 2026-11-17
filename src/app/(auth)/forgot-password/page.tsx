"use client";

import { useState } from "react";
import Link from "next/link";
import AuthSplitLayout from "@/components/layout/auth/AuthSplitLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.add({
        title: "Email Required",
        description: "Please enter your registered email address.",
        type: "error",
      });
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setIsSubmitted(true);
      toast.add({
        title: "Instructions Dispatched",
        description: `We've sent password reset instructions to ${email}.`,
        type: "success",
      });
    }, 800);
  };

  return (
    <AuthSplitLayout
      title="Reset Password"
      subtitle="Enter the email address tied to your account to recover your access."
    >
      {isSubmitted ? (
        <div className="space-y-6 text-center py-4">
          <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-foreground">
              Check Your Inbox
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We have dispatched a reset link and verification code to:
              <br />
              <span className="font-bold text-primary">{email}</span>
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link href={`/reset-password?email=${encodeURIComponent(email)}`}>
              <Button className="w-full rounded-xl bg-primary text-primary-foreground font-bold">
                Enter 6-Digit Reset Code
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => setIsSubmitted(false)}
            >
              Try Another Email
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field className="space-y-2">
            <FieldLabel htmlFor="reset-email" className="text-xs font-semibold">
              Your Registered Email
            </FieldLabel>
            <div className="relative">
              <Input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 rounded-xl"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </Field>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 py-5 text-sm"
          >
            {isPending ? (
              <>
                <Spinner />
                <span>Sending Code...</span>
              </>
            ) : (
              "Send Reset Instructions"
            )}
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </AuthSplitLayout>
  );
}
