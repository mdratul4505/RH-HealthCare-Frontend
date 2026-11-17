import { Suspense } from "react";
import AuthSplitLayout from "@/components/layout/auth/AuthSplitLayout";
import ResetPasswordClient from "./reset-password-client";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout
      title="Create New Password"
      subtitle="Enter your verification code and set a new secure password for your account."
    >
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Spinner className="size-6 text-primary" />
            <p className="text-xs text-muted-foreground">Loading reset session...</p>
          </div>
        }
      >
        <ResetPasswordClient />
      </Suspense>
    </AuthSplitLayout>
  );
}
