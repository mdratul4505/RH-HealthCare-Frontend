import { Suspense } from "react";
import VerifyAccountForm from "@/components/form/verify-account-form";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, ShieldCheck } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyDoctorPage() {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="teal" className="text-xs px-3 py-1 font-semibold gap-1.5 mx-auto">
          <Stethoscope className="size-3.5" />
          <span>Doctor Verification</span>
        </Badge>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Confirm Your Medical Account
        </h1>
        <p className="text-xs text-muted-foreground">
          Enter the 6-digit confirmation code dispatched to your registered medical practice email.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Spinner className="size-6 text-primary" />
              <p className="text-xs text-muted-foreground">Loading verification session...</p>
            </div>
          }
        >
          <VerifyAccountForm mode="doctor" />
        </Suspense>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-emerald-500" />
        <span>BMDC Credential Protection Active</span>
      </div>
    </div>
  );
}
