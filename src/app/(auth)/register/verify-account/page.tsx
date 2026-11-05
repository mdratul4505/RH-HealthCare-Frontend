import VerifyAccountForm from "@/components/form/verify-account-form";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function VerifyPatientPage() {
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
        <div className="w-full max-w-md">
          <Suspense
            fallback={
              <p className="text-center text-sm text-muted-foreground">
                Loading...
              </p>
            }
          >
            <VerifyAccountForm mode="patient" />
          </Suspense>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-muted-foreground">
        &copy; 2026 RH HealthCare. All rights reserved.
      </div>
    </div>
  );
}
