import VerifyAccountForm from "@/components/form/verify-account-form";
import { Suspense } from "react";

export default function VerifyDoctorPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading...</p>}>
        <VerifyAccountForm mode="doctor" />
      </Suspense>
    </div>
  );
}
