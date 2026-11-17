"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DoctorReviewSheet from "./doctor-review-sheet";
import { ShieldCheck, Clock, Hospital } from "lucide-react";

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

const INITIAL_APPLICANTS: DoctorApplicant[] = [
  {
    id: "doc-app-1",
    name: "Dr. Mir Hussain",
    email: "drmir@gmail.com",
    phone: "01912345678",
    specialization: "Cardiology",
    licenseNumber: "BMDC-A-94812",
    qualifications: "MBBS, FCPS (Cardiology)",
    experienceYears: 10,
    consultationFee: 1200,
    hospital: "National Heart Foundation, Dhaka",
    bio: "Interventional cardiologist dedicated to expanding digital patient accessibility and preventive cardiac screening.",
    status: "PENDING",
  },
  {
    id: "doc-app-2",
    name: "Dr. Anika Tabassum",
    email: "dr.anika@example.com",
    phone: "01788223344",
    specialization: "Dermatology",
    licenseNumber: "BMDC-A-72901",
    qualifications: "MBBS, MD (Dermatology & Venereology)",
    experienceYears: 8,
    consultationFee: 1000,
    hospital: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
    bio: "Consultant dermatologist with a focus on clinical dermatosurgery, acne management, and telehealth consultations.",
    status: "PENDING",
  },
  {
    id: "doc-app-3",
    name: "Dr. Mahir Abdullah",
    email: "mahir.neuro@example.com",
    phone: "01855667788",
    specialization: "Neurology",
    licenseNumber: "BMDC-A-66120",
    qualifications: "MBBS, FCPS (Neurology), MRCP (UK)",
    experienceYears: 14,
    consultationFee: 1500,
    hospital: "National Institute of Neurosciences & Hospital, Dhaka",
    bio: "Senior consultant neurologist treating chronic headache disorders, stroke rehabilitation, and movement disorders.",
    status: "PENDING",
  },
  {
    id: "doc-app-4",
    name: "Dr. Sarah Rahman",
    email: "sarah.rahman@gmail.com",
    phone: "01711223344",
    specialization: "Cardiology",
    licenseNumber: "BMDC-A-84920",
    qualifications: "MBBS, FCPS, MD",
    experienceYears: 12,
    consultationFee: 1000,
    hospital: "National Heart Foundation, Dhaka",
    bio: "Over a decade of clinical excellence in non-invasive cardiovascular medicine.",
    status: "APPROVED",
  },
];

export default function DoctorApprovalTable({
  statusFilter = "all",
}: {
  statusFilter?: "pending" | "approved" | "rejected" | "all";
}) {
  const [applicants, setApplicants] = useState<DoctorApplicant[]>(INITIAL_APPLICANTS);

  const handleApprove = (id: string) => {
    setApplicants((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: "APPROVED" } : doc))
    );
  };

  const handleReject = (id: string) => {
    setApplicants((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: "REJECTED" } : doc))
    );
  };

  const filtered = applicants.filter((doc) => {
    if (statusFilter === "pending") return doc.status === "PENDING";
    if (statusFilter === "approved") return doc.status === "APPROVED";
    if (statusFilter === "rejected") return doc.status === "REJECTED";
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center rounded-2xl border border-dashed border-border bg-card p-6 space-y-2">
        <ShieldCheck className="size-8 text-muted-foreground mx-auto" />
        <p className="text-sm font-bold text-foreground">No applications found</p>
        <p className="text-xs text-muted-foreground">
          There are currently no doctor applications matching this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="text-xs font-bold">Doctor Candidate</TableHead>
            <TableHead className="text-xs font-bold">Specialization & License</TableHead>
            <TableHead className="text-xs font-bold">Hospital Affiliation</TableHead>
            <TableHead className="text-xs font-bold">Fee</TableHead>
            <TableHead className="text-xs font-bold">Status</TableHead>
            <TableHead className="text-xs font-bold text-right">Review Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((doctor) => (
            <TableRow key={doctor.id} className="hover:bg-muted/30">
              <TableCell>
                <div>
                  <p className="font-bold text-foreground text-xs">{doctor.name}</p>
                  <p className="text-[11px] text-muted-foreground">{doctor.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-0.5">
                  <Badge variant="teal" className="text-[10px] font-semibold">
                    {doctor.specialization}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="size-3 text-emerald-500" />
                    {doctor.licenseNumber}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Hospital className="size-3 text-primary shrink-0" />
                  {doctor.hospital}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-bold text-xs text-foreground">৳ {doctor.consultationFee}</span>
              </TableCell>
              <TableCell>
                {doctor.status === "PENDING" ? (
                  <Badge variant="outline" className="text-[10px] font-bold text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30">
                    Pending Review
                  </Badge>
                ) : doctor.status === "APPROVED" ? (
                  <Badge variant="emerald" className="text-[10px] font-bold">
                    Approved
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-[10px] font-bold">
                    Rejected
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DoctorReviewSheet
                  doctor={doctor}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
