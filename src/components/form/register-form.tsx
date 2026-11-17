"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { patientRegistrationSchema } from "@/validation";
import z from "zod";
import { useRegistration } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  type PatientDefaultValues = z.infer<typeof patientRegistrationSchema>;

  const defaultValues: PatientDefaultValues = {
    name: "Mir",
    email: "mir@gmail.com",
    contactNumber: "01912345678",
    password: "@User123456",
    confirmPassword: "@User123456",
  };

  const { mutate: registration, isPending: registrationPending } =
    useRegistration();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: patientRegistrationSchema,
    },
    onSubmit: async ({ value }) => {
      if (!agreedToTerms) {
        toast.add({
          title: "Terms Required",
          description: "Please accept the patient terms of service to continue.",
          type: "error",
        });
        return;
      }

      const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
        patient: {
          contactNumber: value.contactNumber,
        },
      };

      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });
          }

          toast.add({
            title: "Registration Initiated",
            description: "Please check your email for the 6-digit verification code.",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err: any) => {
          const errorMessage =
            err?.data?.message ||
            err?.message ||
            "Unable to register account. Please review your details.";
          toast.add({
            title: "Registration Error",
            description: errorMessage,
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Legal Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g. Tanvir Ahmed"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                    className="rounded-xl"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

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
                    placeholder="e.g. name@domain.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    className="rounded-xl"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Contact Number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="017XXXXXXXX"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="tel"
                    className="rounded-xl"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pr-10 rounded-xl"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
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

            <form.Field name="confirmPassword">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pr-10 rounded-xl"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
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
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="patient-terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <label
              htmlFor="patient-terms"
              className="text-xs text-muted-foreground select-none cursor-pointer leading-tight"
            >
              I agree to the PH Healthcare System{" "}
              <span className="text-primary font-semibold">Terms of Service</span> and{" "}
              <span className="text-primary font-semibold">Patient Privacy Policy</span>.
            </label>
          </div>

          <Button
            disabled={registrationPending}
            type="submit"
            className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 py-5 text-sm"
          >
            {registrationPending ? (
              <>
                <Spinner />
                <span>Creating Account...</span>
              </>
            ) : (
              "Create Patient Account"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>
        <span className="text-[11px] font-semibold text-muted-foreground">
          Or continue with
        </span>
      </FieldSeparator>

      <div className="space-y-1.5">
        <GoogleLoginComponent />
        <p className="text-[10px] text-center text-muted-foreground">
          Instant Google registration creates an auto-verified Patient profile.
        </p>
      </div>

      <div className="pt-2 border-t border-border/70 space-y-2 text-center text-xs">
        <div className="text-muted-foreground">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:underline underline-offset-4"
          >
            Sign In Here
          </Link>
        </div>
        <div className="text-muted-foreground">
          Are you a certified doctor?{" "}
          <Link
            href="/apply"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            Submit Doctor Application
          </Link>
        </div>
      </div>
    </div>
  );
}
