import { Suspense } from "react";
import AuthSplitLayout from "@/components/layout/auth/AuthSplitLayout";
import VerifyAccountForm from "@/components/form/verify-account-form";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyPatientPage() {
  return (
    <AuthSplitLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit verification code sent to your registered email address."
    >
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Spinner className="size-6 text-primary" />
            <p className="text-xs text-muted-foreground">Loading verification session...</p>
          </div>
        }
      >
        <VerifyAccountForm mode="patient" />
      </Suspense>
    </AuthSplitLayout>
  );
}
