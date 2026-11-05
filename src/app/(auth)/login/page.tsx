import LoginForm from "@/components/form/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-6 sm:p-10">
      {/* Top bar: Go to Home only */}
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Go to Home</span>
        </Link>
      </div>

      {/* Center: Form */}
      <div className="my-auto py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="mb-6 space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-muted-foreground">
        &copy; 2026 RH HealthCare. All rights reserved.
      </div>
    </div>
  );
}
