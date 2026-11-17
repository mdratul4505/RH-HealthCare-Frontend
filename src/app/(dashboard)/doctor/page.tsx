"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetMe } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import {
  Calendar,
  Clock,
  Video,
  FileCheck2,
  Banknote,
  Users,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PatientQueueItem {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  slotTime: string;
  symptoms: string;
  status: "WAITING" | "IN_PROGRESS" | "COMPLETED";
}

const MOCK_TODAY_QUEUE: PatientQueueItem[] = [
  {
    id: "apt-8921",
    patientName: "Mir Hussain",
    age: 32,
    gender: "Male",
    slotTime: "05:00 PM - 05:20 PM",
    symptoms: "Chest tightness, elevated blood pressure reading (140/90)",
    status: "WAITING",
  },
  {
    id: "apt-8922",
    patientName: "Sadia Sultana",
    age: 28,
    gender: "Female",
    slotTime: "05:20 PM - 05:40 PM",
    symptoms: "Post-viral fatigue, heart palpitation review",
    status: "WAITING",
  },
  {
    id: "apt-8923",
    patientName: "Rafiqul Islam",
    age: 55,
    gender: "Male",
    slotTime: "05:40 PM - 06:00 PM",
    symptoms: "Routine ECG follow-up & hypertension medication dosage",
    status: "WAITING",
  },
];

export default function DoctorDashboard() {
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const [activeSlots, setActiveSlots] = useState<Record<string, boolean>>({
    "05:00 PM - 05:20 PM": true,
    "05:20 PM - 05:40 PM": true,
    "05:40 PM - 06:00 PM": true,
    "06:00 PM - 06:20 PM": true,
    "06:20 PM - 06:40 PM": false,
    "06:40 PM - 07:00 PM": true,
  });

  const toggleSlot = (time: string) => {
    setActiveSlots((prev) => {
      const next = !prev[time];
      toast.add({
        title: next ? "Slot Published" : "Slot Suspended",
        description: `${time} is now ${next ? "visible to patients" : "hidden"}.`,
        type: "success",
      });
      return { ...prev, [time]: next };
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Doctor Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>BMDC Certified Medical Board</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Dr. {user?.name || "Practitioner"}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Manage your clinical queue, launch HD telehealth sessions, publish today&apos;s 20-minute slots, and submit digital prescriptions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="#schedules">
              <Button
                size="lg"
                className="bg-white text-teal-900 hover:bg-teal-50 font-bold rounded-xl shadow-md gap-2"
              >
                <Calendar className="size-4" />
                <span>Manage Today&apos;s Slots</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Doctor Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Today&apos;s Appointments</span>
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Video className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">3</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Booked for today</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Consultations</span>
            <div className="size-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">342</span>
            <span className="text-xs text-muted-foreground font-medium">Completed to date</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Prescriptions Issued</span>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">318</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">All authenticated</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Clinical Revenue</span>
            <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Banknote className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">৳ 185,000</span>
            <span className="text-xs text-muted-foreground font-medium">Net earnings</span>
          </div>
        </div>
      </div>

      {/* Today's Live Clinical Queue */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-5" id="today">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="teal" className="text-[10px] font-bold">Live Queue</Badge>
              <h3 className="text-base font-bold text-foreground">Today&apos;s Consultation Schedule</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Patients scheduled for your live 20-minute video telehealth consultations today.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Doctor Online
          </span>
        </div>

        <div className="rounded-2xl border border-border/80 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-xs font-bold">Patient Details</TableHead>
                <TableHead className="text-xs font-bold">Slot Time</TableHead>
                <TableHead className="text-xs font-bold">Chief Complaints / Symptoms</TableHead>
                <TableHead className="text-xs font-bold">Status</TableHead>
                <TableHead className="text-xs font-bold text-right">Consultation Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TODAY_QUEUE.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="font-bold text-foreground text-xs">{item.patientName}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.gender}, {item.age} years
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-xs text-primary flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {item.slotTime}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                      {item.symptoms}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-bold text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30">
                      Waiting Room
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/appointments/${item.id}`}>
                      <Button size="sm" className="rounded-xl bg-primary text-primary-foreground font-bold text-xs gap-1.5 shadow-xs">
                        <Video className="size-3.5" />
                        <span>Launch Studio</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Schedule Slot Publisher */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-5" id="schedules">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Daily 20-Minute Slot Publisher
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Toggle availability for each 20-minute slot. Only published slots appear on your public doctor profile.
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-semibold">
            Today&apos;s Slots (17 Nov 2026)
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(activeSlots).map(([slotTime, isPublished]) => (
            <div
              key={slotTime}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                isPublished
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/60 bg-muted/20 opacity-70"
              }`}
            >
              <div>
                <p className="text-xs font-bold text-foreground">{slotTime}</p>
                <p className="text-[10px] text-muted-foreground">
                  {isPublished ? "Visible to patients" : "Suspended"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleSlot(slotTime)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors ${
                  isPublished
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {isPublished ? "Active" : "Paused"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
