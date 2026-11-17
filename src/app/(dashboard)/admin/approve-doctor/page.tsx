import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DoctorApprovalPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="teal" className="text-xs font-semibold gap-1">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Medical Credential Review</span>
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-1">
            Doctor Application Approvals
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspect BMDC licenses, institutional credentials, and approve certified doctors to join the platform.
          </p>
        </div>
      </div>

      <DoctorApprovalTabs />
    </div>
  );
}
