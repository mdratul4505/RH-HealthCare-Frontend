"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, KeyRound, Sparkles, Stethoscope, User, ShieldCheck } from "lucide-react";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "Super@admin12345",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: async (res: any) => {
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.add({
            title: "Welcome back!",
            description: "Authentication successful. Redirecting to your dashboard...",
            type: "success",
          });

          const loggedRole = res?.data?.user?.role;
          if (loggedRole === "SUPER_ADMIN" || loggedRole === "ADMIN") {
            router.push("/admin");
          } else if (loggedRole === "DOCTOR") {
            router.push("/doctor");
          } else if (loggedRole === "PATIENT") {
            router.push("/patient");
          } else {
            router.push("/");
          }
          router.refresh();
        },
        onError: (err: any) => {
          const errorMessage =
            err?.data?.message ||
            err?.message ||
            "Invalid credentials. Please verify your email and password.";
          toast.add({
            title: "Authorization Failure",
            description: errorMessage,
            type: "error",
          });
        },
      });
    },
  });

  const handleQuickDemo = (role: "admin" | "patient" | "doctor") => {
    if (role === "admin") {
      form.setFieldValue("email", "superadmin@gmail.com");
      form.setFieldValue("password", "Super@admin12345");
    } else if (role === "patient") {
      form.setFieldValue("email", "mir@gmail.com");
      form.setFieldValue("password", "@User123456");
    } else {
      form.setFieldValue("email", "doctor@gmail.com");
      form.setFieldValue("password", "@Doctor123456");
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.add({
        title: "Email Required",
        description: "Please enter your registered email address.",
        type: "error",
      });
      return;
    }
    setForgotSubmitted(true);
    toast.add({
      title: "Reset Instructions Sent",
      description: `If an account exists for ${forgotEmail}, a verification code has been dispatched.`,
      type: "success",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Quick Demo Credentials Pill Bar */}
      <div className="rounded-2xl bg-muted/50 p-2.5 border border-border/70">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium mb-1.5 px-1">
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Sparkles className="size-3 text-primary" /> Demo Fill:
          </span>
          <span>Click to autofill</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => handleQuickDemo("admin")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-card border border-border hover:border-primary/50 text-[11px] font-semibold text-foreground transition-colors"
          >
            <ShieldCheck className="size-3 text-primary" /> Super Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo("patient")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-card border border-border hover:border-primary/50 text-[11px] font-semibold text-foreground transition-colors"
          >
            <User className="size-3 text-blue-500" /> Patient
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo("doctor")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-card border border-border hover:border-primary/50 text-[11px] font-semibold text-foreground transition-colors"
          >
            <Stethoscope className="size-3 text-emerald-500" /> Doctor
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="e.g. user@example.com"
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    className="rounded-xl"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your account password"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      className="pr-10 rounded-xl"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Remember me option */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="text-xs text-muted-foreground select-none cursor-pointer"
            >
              Remember this device for 30 days
            </label>
          </div>

          <Button
            disabled={loginPending}
            type="submit"
            className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 py-5 text-sm"
          >
            {loginPending ? (
              <>
                <Spinner />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In to Account"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>
        <span className="text-[11px] font-semibold text-muted-foreground">
          Or continue with
        </span>
      </FieldSeparator>

      {/* Google Login for Patients */}
      <div className="space-y-1.5">
        <GoogleLoginComponent />
        <p className="text-[10px] text-center text-muted-foreground">
          Note: Google authentication is reserved for Patient accounts.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="pt-2 border-t border-border/70 space-y-2 text-center text-xs">
        <div className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-primary hover:underline underline-offset-4"
          >
            Register as Patient
          </Link>
        </div>
        <div className="text-muted-foreground">
          Are you a licensed doctor?{" "}
          <Link
            href="/apply"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            Apply to Join Medical Board
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="size-5 text-primary" />
              Reset Your Password
            </DialogTitle>
            <DialogDescription className="text-xs">
              Enter the email associated with your account, and we will send a password reset code.
            </DialogDescription>
          </DialogHeader>

          {forgotSubmitted ? (
            <div className="space-y-4 py-3">
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 text-xs space-y-1.5 text-center">
                <p className="font-bold text-foreground">Verification Sent!</p>
                <p className="text-muted-foreground">
                  Check <span className="font-semibold text-primary">{forgotEmail}</span> for your reset instructions.
                </p>
              </div>
              <Button
                type="button"
                className="w-full rounded-xl"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotSubmitted(false);
                }}
              >
                Close & Return
              </Button>
            </div>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Registered Email Address
                </label>
                <Input
                  type="email"
                  placeholder="doctor@gmail.com or mir@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="w-1/2 rounded-xl"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 rounded-xl bg-primary text-primary-foreground font-bold">
                  Send Code
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
