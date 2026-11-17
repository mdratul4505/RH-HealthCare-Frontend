"use client";

import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import { useGetMe } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Video,
  FileCheck2,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Download,
  AlertCircle,
  CreditCard,
  Plus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MockAppointment {
  id: string;
  doctorName: string;
  specialization: string;
  hospital: string;
  date: string;
  timeSlot: string;
  fee: number;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  meetingUrl?: string;
  prescriptionId?: string;
}

const MOCK_PATIENT_APPOINTMENTS: MockAppointment[] = [
  {
    id: "apt-8921",
    doctorName: "Dr. Sarah Rahman",
    specialization: "Cardiology",
    hospital: "National Heart Foundation, Dhaka",
    date: "Today, 17 Nov 2026",
    timeSlot: "05:00 PM - 05:20 PM",
    fee: 1050,
    status: "SCHEDULED",
    meetingUrl: "/appointments/apt-8921",
  },
  {
    id: "apt-8714",
    doctorName: "Dr. Kamrul Hasan",
    specialization: "Dermatology",
    hospital: "Dhaka Medical College Hospital",
    date: "12 Nov 2026",
    timeSlot: "06:20 PM - 06:40 PM",
    fee: 1250,
    status: "COMPLETED",
    prescriptionId: "rx-391",
  },
  {
    id: "apt-8590",
    doctorName: "Dr. Nusrat Jahan",
    specialization: "Pediatrics",
    hospital: "Bangladesh Shishu Hospital",
    date: "28 Oct 2026",
    timeSlot: "04:00 PM - 04:20 PM",
    fee: 950,
    status: "COMPLETED",
    prescriptionId: "rx-240",
  },
];

export default function PatientDashboard() {
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const nextAppointment = MOCK_PATIENT_APPOINTMENTS.find(
    (a) => a.status === "SCHEDULED"
  );

  return (
    <PageTransition className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Fast Booking Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="size-3.5" />
              <span>Patient Health Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hello, {user?.name || "Valued Patient"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Track your upcoming video doctor consultations, download authenticated e-prescriptions, and explore certified specialists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/doctors">
              <Button
                size="lg"
                className="bg-white text-teal-900 hover:bg-teal-50 font-bold rounded-xl shadow-md gap-2"
              >
                <Plus className="size-4" />
                <span>Find & Book Doctor</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Upcoming Consultations</span>
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">1</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Ready today</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Consultations</span>
            <div className="size-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Video className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">14</span>
            <span className="text-xs text-muted-foreground font-medium">All completed</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Digital Prescriptions</span>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">12</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">PDF downloadable</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Medical Invoices</span>
            <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Receipt className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">৳ 14,250</span>
            <span className="text-xs text-muted-foreground font-medium">bKash / Card</span>
          </div>
        </div>
      </div>

      {/* Next Up Video Consultation Banner */}
      {nextAppointment && (
        <div className="rounded-3xl border-2 border-primary/40 bg-card p-6 sm:p-7 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="teal" className="text-xs font-semibold">
                  Upcoming Consultation
                </Badge>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Slot Ready
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Consultation with {nextAppointment.doctorName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {nextAppointment.specialization} &bull; {nextAppointment.hospital}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/appointments/${nextAppointment.id}`}>
                <Button
                  size="lg"
                  className="rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 gap-2"
                >
                  <Video className="size-4" />
                  <span>Join Consultation Studio</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/80 text-xs">
            <div className="rounded-xl bg-muted/40 p-2.5">
              <span className="text-[10px] text-muted-foreground block font-medium">Session Date</span>
              <span className="font-bold text-foreground">{nextAppointment.date}</span>
            </div>
            <div className="rounded-xl bg-muted/40 p-2.5">
              <span className="text-[10px] text-muted-foreground block font-medium">Selected Slot</span>
              <span className="font-bold text-foreground">{nextAppointment.timeSlot}</span>
            </div>
            <div className="rounded-xl bg-muted/40 p-2.5">
              <span className="text-[10px] text-muted-foreground block font-medium">Consultation Fee</span>
              <span className="font-bold text-foreground">৳ {nextAppointment.fee} (Paid)</span>
            </div>
            <div className="rounded-xl bg-muted/40 p-2.5">
              <span className="text-[10px] text-muted-foreground block font-medium">Video Encryption</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="size-3.5" /> HIPAA Compliant
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Appointment History Table */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-5" id="history">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Appointment & Consultation History
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review previous doctor consultations, verified prescriptions, and appointment records.
            </p>
          </div>
          <Link href="/doctors">
            <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5 font-semibold">
              <span>Book Another</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-border/80 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-xs font-bold">Doctor & Specialty</TableHead>
                <TableHead className="text-xs font-bold">Date & Time Slot</TableHead>
                <TableHead className="text-xs font-bold">Fee</TableHead>
                <TableHead className="text-xs font-bold">Status</TableHead>
                <TableHead className="text-xs font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PATIENT_APPOINTMENTS.map((apt) => (
                <TableRow key={apt.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="font-bold text-foreground text-xs">{apt.doctorName}</p>
                      <p className="text-[11px] text-muted-foreground">{apt.specialization}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <p className="font-medium text-foreground">{apt.date}</p>
                      <p className="text-[11px] text-muted-foreground">{apt.timeSlot}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-xs text-foreground">৳ {apt.fee}</span>
                  </TableCell>
                  <TableCell>
                    {apt.status === "SCHEDULED" ? (
                      <Badge variant="teal" className="text-[10px] font-bold">
                        Scheduled
                      </Badge>
                    ) : apt.status === "COMPLETED" ? (
                      <Badge variant="emerald" className="text-[10px] font-bold">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-[10px] font-bold">
                        Cancelled
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/appointments/${apt.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                          View Details
                        </Button>
                      </Link>
                      {apt.status === "COMPLETED" && (
                        <Link href={`/appointments/${apt.id}#prescription`}>
                          <Button size="sm" variant="ghost" className="rounded-lg text-xs text-primary gap-1 h-8">
                            <Download className="size-3.5" /> Prescription
                          </Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageTransition>
  );
}
