"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import {
  ShieldCheck,
  Hospital,
  GraduationCap,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";

interface DoctorApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  consultationFee: number;
  hospital: string;
  bio: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function DoctorReviewSheet({
  doctor,
  onApprove,
  onReject,
}: {
  doctor: DoctorApplicant;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleAction = (type: "approve" | "reject") => {
    if (type === "approve") {
      onApprove?.(doctor.id);
      toast.add({
        title: "Doctor Approved",
        description: `${doctor.name} has been certified and granted doctor portal access.`,
        type: "success",
      });
    } else {
      onReject?.(doctor.id);
      toast.add({
        title: "Application Rejected",
        description: `${doctor.name}'s application was declined.`,
        type: "error",
      });
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
          Review Application
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Badge variant="teal" className="text-[10px] font-bold">
              {doctor.specialization}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              <ShieldCheck className="size-3 text-emerald-500 mr-1" />
              {doctor.licenseNumber}
            </Badge>
          </div>
          <SheetTitle className="text-xl font-extrabold text-foreground mt-2">
            {doctor.name}
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            BMDC Credential & Medical Practice Review
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6 text-xs">
          {/* Qualifications & Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Medical Credentials
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-[10px] text-muted-foreground block font-medium">Degrees & Fellowship</span>
                <span className="font-bold text-foreground block mt-0.5">{doctor.qualifications}</span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-[10px] text-muted-foreground block font-medium">Experience</span>
                <span className="font-bold text-foreground block mt-0.5">{doctor.experienceYears} Years</span>
              </div>
            </div>
          </div>

          {/* Hospital & Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Hospital Affiliation & Contact
            </h4>
            <div className="p-3.5 rounded-xl border border-border bg-card space-y-2">
              <p className="flex items-center gap-2 text-foreground font-semibold">
                <Hospital className="size-3.5 text-primary" /> {doctor.hospital}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-3.5 text-primary" /> {doctor.email}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-3.5 text-primary" /> {doctor.phone}
              </p>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Doctor Professional Statement
            </h4>
            <p className="text-muted-foreground leading-relaxed p-3 rounded-xl bg-muted/30 border border-border">
              {doctor.bio}
            </p>
          </div>

          {/* Fee & Verified Document */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-primary/5 border border-primary/20">
            <div>
              <span className="text-[10px] text-muted-foreground block">Proposed Consultation Fee</span>
              <span className="text-base font-black text-primary">৳ {doctor.consultationFee}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
              <FileText className="size-4" />
              <span>BMDC Certificate Verified</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAction("reject")}
              className="w-1/2 rounded-xl text-destructive hover:bg-destructive/10 border-destructive/30 font-bold"
            >
              <XCircle className="size-4 mr-1.5" /> Reject
            </Button>
            <Button
              type="button"
              onClick={() => handleAction("approve")}
              className="w-1/2 rounded-xl bg-primary text-primary-foreground font-bold shadow-md"
            >
              <CheckCircle2 className="size-4 mr-1.5" /> Approve & Certify
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
