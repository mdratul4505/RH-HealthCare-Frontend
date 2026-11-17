import DoctorApplyForm from "@/components/form/doctor-apply-form";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Calendar,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";

export default function DoctorApplyPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="teal" className="text-xs px-3 py-1 font-semibold gap-1.5">
          <Stethoscope className="size-3.5" />
          <span>PH Healthcare Medical Board</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Apply to Join Our Certified Doctor Network
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Conduct flexible online consultations, publish your daily 20-minute slots, and provide digital care to patients across Bangladesh.
        </p>
      </div>

      {/* 3 Benefit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Calendar className="size-5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">
            Flexible Daily Schedules
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Set your own available time slots and consultation capacity on your personalized doctor dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Banknote className="size-5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">
            Direct & Timely Earnings
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Transparent fee structure. Receive payouts directly after completed video consultations with full analytics.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileCheck2 className="size-5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">
            Smart Digital Prescriptions
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Issue authenticated, BMDC-compliant digital prescriptions to patients with a single click after consultation.
          </p>
        </div>
      </div>

      {/* Main Application Form Container */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs">
        <div className="mb-8 pb-6 border-b border-border/80">
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
            <ShieldCheck className="size-5 text-emerald-500" />
            <span>Doctor Credentials Submission</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Please fill out all required fields accurately. Our administrative medical board will verify your BMDC license and certificates.
          </p>
        </div>

        <DoctorApplyForm />
      </div>

      {/* Approval Timeline Note */}
      <div className="rounded-2xl bg-muted/40 border border-border/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <CheckCircle2 className="size-4" />
          </div>
          <div>
            <p className="font-bold text-foreground">Fast Verification Process</p>
            <p>Admin verification typically completes within 24 to 48 hours of submission.</p>
          </div>
        </div>
        <span className="text-[11px] font-medium text-primary">
          Questions? Contact medical@ph-healthcare.com
        </span>
      </div>
    </div>
  );
}
