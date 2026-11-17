"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { Mail, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";

const RESEND_COOLDOWN = 60;

export default function VerifyAccountForm({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyPatient, isPending: patientPending } = useVerifyAccount();
  const { mutate: verifyDoctor, isPending: doctorPending } = useVerifyDoctorAccount();

  const isSubmitting = mode === "doctor" ? doctorPending : patientPending;
  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res: any) => {
        if (!res?.success && res?.message) {
          toast.add({
            title: "Verification Failure",
            description: res.message,
            type: "error",
          });
          return;
        }

        if (mode === "doctor") {
          toast.add({
            title: "Application Verified!",
            description:
              "Your medical credentials have been submitted for administrative review. You will receive an approval notification shortly.",
            type: "success",
          });
          router.push("/login");
          return;
        }

        toast.add({
          title: "Account Activated!",
          description: "Your patient account is now fully verified. Welcome to PH HealthCare!",
          type: "success",
        });
        router.push("/login");
      },
      onError: (err: any) => {
        toast.add({
          title: "Verification Failed",
          description:
            err?.data?.message ||
            err?.message ||
            "Invalid or expired verification code. Please request a new code.",
          type: "error",
        });
      },
    });
  };

  const handleResend = () => {
    setResendTimer(RESEND_COOLDOWN);
    toast.add({
      title: "New Code Dispatched",
      description: `A fresh 6-digit confirmation code was sent to ${email}.`,
      type: "success",
    });
  };

  if (!email) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-muted/40 border border-border/70 p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="size-4 text-primary shrink-0" />
          <span>Verification email dispatched to:</span>
        </div>
        <p className="text-sm font-bold text-foreground break-all">
          {email}
        </p>
      </div>

      <form
        id="otp-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOTP();
        }}
        className="space-y-5"
      >
        <Field data-invalid={isInvalid} className="space-y-3">
          <FieldLabel htmlFor="otp" className="text-xs font-semibold">
            6-Digit Verification Code
          </FieldLabel>

          <div className="flex justify-center py-2">
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="one-time-code"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                <InputOTPSlot index={0} className="size-11 sm:size-12 rounded-xl text-lg font-bold" />
                <InputOTPSlot index={1} className="size-11 sm:size-12 rounded-xl text-lg font-bold" />
                <InputOTPSlot index={2} className="size-11 sm:size-12 rounded-xl text-lg font-bold" />
                <InputOTPSlot index={3} className="size-11 sm:size-12 rounded-xl text-lg font-bold" />
                <InputOTPSlot index={4} className="size-11 sm:size-12 rounded-xl text-lg font-bold" />
                <InputOTPSlot index={5} className="size-11 sm:size-12 rounded-xl text-lg font-bold" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {isInvalid && (
            <FieldError
              errors={[{ message: "Please enter all 6 digits of your verification code." }]}
            />
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>Didn&apos;t receive the code?</span>
            {resendTimer > 0 ? (
              <span className="font-semibold text-primary">
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <RefreshCw className="size-3" /> Resend Code
              </button>
            )}
          </div>
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting || otp.length !== 6}
          className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 py-5 text-sm"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              <span>Verifying Code...</span>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" /> Verify & Continue
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
