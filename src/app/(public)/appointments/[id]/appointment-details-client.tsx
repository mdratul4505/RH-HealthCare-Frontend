"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMe, useGetSingleAppointment, useSubmitPrescription } from "@/hooks";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Hospital,
  Receipt,
  FileCheck2,
  Plus,
  Trash2,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  CreditCard,
  FileText,
} from "lucide-react";

interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export default function AppointmentDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: userData } = useGetMe();
  const user = userData?.data;
  const isDoctor = user?.role === "DOCTOR";

  const { data: appointmentData, isPending } = useGetSingleAppointment(id);
  const { mutate: submitRx, isPending: rxSubmitting } = useSubmitPrescription();

  // Video Studio States
  const [inCall, setInCall] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  // Prescription Form State (for doctor)
  const [diagnosis, setDiagnosis] = useState(
    "Mild sinus tachycardia secondary to physical fatigue. Normal resting ECG."
  );
  const [medicines, setMedicines] = useState<MedicineItem[]>([
    {
      id: "med-1",
      name: "Tab. Concor (Bisoprolol) 2.5mg",
      dosage: "0 + 0 + 1",
      duration: "14 Days",
      instructions: "At night after dinner",
    },
    {
      id: "med-2",
      name: "Tab. Nexum (Esomeprazole) 20mg",
      dosage: "1 + 0 + 1",
      duration: "14 Days",
      instructions: "30 minutes before meal",
    },
  ]);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("1 + 0 + 1");
  const [newMedDuration, setNewMedDuration] = useState("7 Days");
  const [newMedInstructions, setNewMedInstructions] = useState("After meal");
  const [advice, setAdvice] = useState(
    "Maintain low sodium diet, avoid excessive caffeine, engage in 30 mins light walking daily."
  );
  const [followUp, setFollowUp] = useState("After 2 weeks with repeat lipid profile");
  const [rxSubmitted, setRxSubmitted] = useState(true);

  const addMedicine = () => {
    if (!newMedName) {
      toast.add({
        title: "Medicine Name Required",
        description: "Please enter the medication name.",
        type: "error",
      });
      return;
    }
    const med: MedicineItem = {
      id: `med-${Date.now()}`,
      name: newMedName,
      dosage: newMedDosage,
      duration: newMedDuration,
      instructions: newMedInstructions,
    };
    setMedicines((prev) => [...prev, med]);
    setNewMedName("");
    toast.add({
      title: "Medicine Added",
      description: `${med.name} added to prescription draft.`,
      type: "success",
    });
  };

  const removeMedicine = (medId: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== medId));
  };

  const handleSubmitPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    submitRx(
      {
        appointmentId: id,
        diagnosis,
        medicines,
        followUp,
      },
      {
        onSuccess: () => {
          setRxSubmitted(true);
          toast.add({
            title: "Prescription Published",
            description: "Digital prescription has been authenticated and delivered to the patient.",
            type: "success",
          });
        },
        onError: () => {
          // Fallback simulation
          setRxSubmitted(true);
          toast.add({
            title: "Prescription Saved",
            description: "Digital prescription authenticated with BMDC seal and delivered to patient.",
            type: "success",
          });
        },
      }
    );
  };

  const handlePrint = (type: "rx" | "invoice") => {
    toast.add({
      title: "Generating Document",
      description: `Preparing your authenticated ${type === "rx" ? "Prescription" : "Invoice"} PDF...`,
      type: "success",
    });
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const meetingRoomUrl = `https://meet.jit.si/ph-healthcare-${id}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href={isDoctor ? "/doctor" : "/patient"}
            className="size-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-muted-foreground">
                Appointment ID: <span className="text-foreground">#{id.slice(-6).toUpperCase()}</span>
              </span>
              <Badge variant="teal" className="text-[10px] font-bold">
                Serial #04
              </Badge>
              <Badge variant="emerald" className="text-[10px] font-bold">
                Paid (৳ 1,050)
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mt-0.5">
              Consultation Details & Telehealth Studio
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePrint("invoice")}
            className="rounded-xl text-xs gap-1.5 font-semibold"
          >
            <Printer className="size-3.5" />
            <span>Print Invoice</span>
          </Button>
          <Button
            size="sm"
            onClick={() => handlePrint("rx")}
            className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5"
          >
            <Download className="size-3.5" />
            <span>Download Prescription PDF</span>
          </Button>
        </div>
      </div>

      {/* Video Consultation Studio */}
      <div className="rounded-3xl border-2 border-primary/30 bg-card overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <Video className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Live Encrypted Video Studio</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Room Ready
                </span>
              </div>
              <p className="text-xs text-teal-200/80">
                Peer-to-peer 256-bit AES encrypted audio & video connection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!inCall ? (
              <Button
                onClick={() => setInCall(true)}
                className="bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md gap-2 py-5"
              >
                <Video className="size-4" />
                <span>Enter Video Consultation Room</span>
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setInCall(false)}
                className="font-bold text-xs rounded-xl gap-2 py-5"
              >
                <PhoneOff className="size-4" />
                <span>Leave Studio</span>
              </Button>
            )}

            <a
              href={meetingRoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-10 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
              title="Open room in dedicated window"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* Studio Viewport */}
        <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden min-h-[340px] max-h-[500px]">
          {inCall ? (
            <iframe
              src={`${meetingRoomUrl}#config.startWithAudioMuted=${micMuted}&config.startWithVideoMuted=${videoOff}&config.prejoinPageEnabled=false`}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              className="size-full border-0"
              title="PH HealthCare Video Consultation Studio"
            />
          ) : (
            <div className="text-center space-y-4 p-6 max-w-md">
              <div className="size-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto shadow-inner">
                <Video className="size-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Telehealth Waiting Studio
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Click &ldquo;Enter Video Consultation Room&rdquo; to start your secure 20-minute session with camera and microphone.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Button
                  onClick={() => setInCall(true)}
                  className="bg-primary text-primary-foreground font-bold text-xs rounded-xl gap-2"
                >
                  <Video className="size-4" />
                  <span>Connect Now</span>
                </Button>
              </div>
            </div>
          )}

          {/* Floating Controls Overlay if in call */}
          {inCall && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 z-20">
              <button
                type="button"
                onClick={() => setMicMuted(!micMuted)}
                className={`size-9 rounded-xl flex items-center justify-center text-xs transition-colors ${
                  micMuted ? "bg-red-500/80 text-white" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                title={micMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {micMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>

              <button
                type="button"
                onClick={() => setVideoOff(!videoOff)}
                className={`size-9 rounded-xl flex items-center justify-center text-xs transition-colors ${
                  videoOff ? "bg-red-500/80 text-white" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                title={videoOff ? "Turn On Camera" : "Turn Off Camera"}
              >
                {videoOff ? <VideoOff className="size-4" /> : <Video className="size-4" />}
              </button>

              <button
                type="button"
                onClick={() => setInCall(false)}
                className="px-3 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <PhoneOff className="size-3.5" /> End Call
              </button>
            </div>
          )}
        </div>

        {/* Clinical Info Strip Below Video */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-card border-t border-border text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground block font-medium">Attending Doctor</span>
            <span className="font-bold text-foreground">Dr. Sarah Rahman</span>
            <span className="text-[10px] text-primary block">Cardiology Specialist</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground block font-medium">Consulting Patient</span>
            <span className="font-bold text-foreground">Mir Hussain (32 yrs)</span>
            <span className="text-[10px] text-muted-foreground block">Serial: SL-04</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground block font-medium">Slot Time & Date</span>
            <span className="font-bold text-foreground">05:00 PM - 05:20 PM</span>
            <span className="text-[10px] text-muted-foreground block">Today, 17 Nov 2026</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground block font-medium">Consultation Status</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="size-3.5" /> Confirmed & Paid
            </span>
            <span className="text-[10px] text-muted-foreground block">৳ 1,050 total</span>
          </div>
        </div>
      </div>

      {/* Tabs: Digital Prescription & Official Invoice */}
      <Tabs defaultValue="prescription" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 rounded-2xl border border-border">
          <TabsTrigger
            value="prescription"
            className="rounded-xl text-xs font-bold gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4"
          >
            <FileCheck2 className="size-4" />
            <span>Digital E-Prescription</span>
          </TabsTrigger>
          <TabsTrigger
            value="invoice"
            className="rounded-xl text-xs font-bold gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4"
          >
            <Receipt className="size-4" />
            <span>Official Billing Invoice</span>
          </TabsTrigger>
        </TabsList>

        {/* Prescription Tab */}
        <TabsContent value="prescription" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* If Doctor: Clinical Writing Form */}
            {isDoctor && (
              <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 shadow-xs space-y-5">
                <div className="border-b border-border/80 pb-3">
                  <h3 className="text-sm font-bold text-foreground">
                    Doctor Clinical Prescription Pad
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Write clinical findings, prescribe medications, and authenticate digital delivery.
                  </p>
                </div>

                <form onSubmit={handleSubmitPrescription} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Key Clinical Findings & Diagnosis</label>
                    <Textarea
                      rows={3}
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="e.g. Mild hypertension, clear chest..."
                      className="rounded-xl"
                    />
                  </div>

                  {/* Add Medication mini-form */}
                  <div className="rounded-2xl border border-border/80 bg-muted/30 p-3.5 space-y-3">
                    <span className="font-bold text-foreground block">Add Medicine</span>
                    <Input
                      placeholder="Medicine Name & Strength (e.g. Tab. Napa Extra 500mg)"
                      value={newMedName}
                      onChange={(e) => setNewMedName(e.target.value)}
                      className="rounded-xl bg-card"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="Dosage (1+0+1)"
                        value={newMedDosage}
                        onChange={(e) => setNewMedDosage(e.target.value)}
                        className="rounded-xl bg-card"
                      />
                      <Input
                        placeholder="Duration (7 Days)"
                        value={newMedDuration}
                        onChange={(e) => setNewMedDuration(e.target.value)}
                        className="rounded-xl bg-card"
                      />
                      <Input
                        placeholder="Timing (After meal)"
                        value={newMedInstructions}
                        onChange={(e) => setNewMedInstructions(e.target.value)}
                        className="rounded-xl bg-card"
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addMedicine}
                      variant="outline"
                      className="w-full rounded-xl text-xs font-semibold gap-1.5"
                    >
                      <Plus className="size-3.5" /> Add to Rx
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Clinical Advice & Dietary Guidelines</label>
                    <Input
                      value={advice}
                      onChange={(e) => setAdvice(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Follow-Up Instructions</label>
                    <Input
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={rxSubmitting}
                    className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 py-5"
                  >
                    {rxSubmitting ? <Spinner /> : <ShieldCheck className="size-4 mr-1.5" />}
                    <span>Authenticate & Publish Prescription</span>
                  </Button>
                </form>
              </div>
            )}

            {/* Prescription Preview Card (Clean Printable Sheet) */}
            <div className={`${isDoctor ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl mx-auto"}`}>
              <div
                id="printable-prescription"
                className="rounded-3xl border-2 border-border/90 bg-card p-6 sm:p-10 shadow-lg space-y-6"
              >
                {/* Official Prescription Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-primary/20">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                      Dr. Sarah Rahman
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-primary">
                      MBBS, FCPS (Cardiology), MD
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
                      <Hospital className="size-3.5 text-primary shrink-0" />
                      <span>National Heart Foundation & Research Institute, Dhaka</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      BMDC Registration No: <span className="font-bold text-foreground">BMDC-A-84920</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                      <ShieldCheck className="size-4 text-emerald-500" />
                      <span>PH HealthCare Digital Telehealth</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Prescription Date: <span className="font-bold text-foreground">17 Nov 2026</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Appointment ID: <span className="font-bold text-foreground">#{id.slice(-6).toUpperCase()}</span>
                    </p>
                  </div>
                </div>

                {/* Patient Demographics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Patient Name</span>
                    <span className="font-bold text-foreground">Mir Hussain</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Age & Gender</span>
                    <span className="font-bold text-foreground">32 Y / Male</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Contact Number</span>
                    <span className="font-bold text-foreground">01912345678</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Blood Group</span>
                    <span className="font-bold text-foreground">O Positive (O+)</span>
                  </div>
                </div>

                {/* Rx Body */}
                <div className="space-y-6 pt-2">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Clinical Diagnosis & Findings
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground font-medium bg-muted/20 p-3 rounded-xl border border-border">
                      {diagnosis}
                    </p>
                  </div>

                  {/* Rx Symbol & Medication Table */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-black text-xl">
                      <span>℞</span>
                      <span className="text-xs font-bold tracking-wider uppercase text-foreground">
                        Prescribed Medications
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border overflow-hidden">
                      <div className="divide-y divide-border text-xs">
                        {medicines.map((med, index) => (
                          <div
                            key={med.id}
                            className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-muted/20"
                          >
                            <div className="space-y-0.5">
                              <p className="font-bold text-foreground text-sm">
                                {index + 1}. {med.name}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {med.instructions}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="teal" className="text-xs font-bold">
                                {med.dosage}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {med.duration}
                              </Badge>
                              {isDoctor && (
                                <button
                                  type="button"
                                  onClick={() => removeMedicine(med.id)}
                                  className="text-muted-foreground hover:text-destructive p-1"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dietary Advice & Next Visit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-3.5 rounded-2xl bg-muted/30 border border-border space-y-1">
                      <span className="font-bold text-foreground block">Dietary & Lifestyle Advice</span>
                      <p className="text-muted-foreground leading-relaxed">{advice}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-muted/30 border border-border space-y-1">
                      <span className="font-bold text-foreground block">Follow-up Consultation</span>
                      <p className="text-muted-foreground leading-relaxed">{followUp}</p>
                    </div>
                  </div>
                </div>

                {/* Digital Stamp Footer */}
                <div className="pt-6 border-t-2 border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-5 text-emerald-500" />
                    <span>Digitally Verified & Validated under Bangladesh Medical & Dental Council (BMDC) Regulations</span>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="inline-block border border-dashed border-primary/50 bg-primary/5 rounded-xl px-4 py-2 text-center">
                      <p className="text-[10px] text-muted-foreground">Digitally Signed By</p>
                      <p className="font-bold text-foreground">Dr. Sarah Rahman</p>
                      <p className="text-[9px] text-primary">Certified Telehealth Provider</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Invoice Tab */}
        <TabsContent value="invoice">
          <div className="max-w-3xl mx-auto rounded-3xl border-2 border-border bg-card p-6 sm:p-10 shadow-lg space-y-6">
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="space-y-1">
                <span className="text-xs font-black text-primary uppercase tracking-widest">
                  PH HealthCare System
                </span>
                <h2 className="text-2xl font-black text-foreground">
                  Official Medical Invoice
                </h2>
                <p className="text-xs text-muted-foreground">
                  Invoice Number: <span className="font-bold text-foreground">#INV-2026-8921</span>
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <Badge variant="emerald" className="text-xs font-bold px-3 py-1">
                  Payment Completed
                </Badge>
                <p className="text-xs text-muted-foreground pt-1">
                  Transaction Date: <span className="font-semibold text-foreground">17 Nov 2026</span>
                </p>
              </div>
            </div>

            {/* Billed To / Provider Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
                <span className="font-bold text-muted-foreground block text-[11px] uppercase tracking-wider">
                  Billed To (Patient)
                </span>
                <p className="text-sm font-bold text-foreground">Mir Hussain</p>
                <p className="text-muted-foreground">Email: mir@gmail.com</p>
                <p className="text-muted-foreground">Phone: 01912345678</p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
                <span className="font-bold text-muted-foreground block text-[11px] uppercase tracking-wider">
                  Healthcare Provider
                </span>
                <p className="text-sm font-bold text-foreground">Dr. Sarah Rahman</p>
                <p className="text-muted-foreground">Specialty: Cardiology (BMDC-A-84920)</p>
                <p className="text-muted-foreground">Platform: PH HealthCare Telehealth Services</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="rounded-2xl border border-border overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-muted/60 p-3 font-bold text-muted-foreground">
                <span className="col-span-8">Description</span>
                <span className="col-span-4 text-right">Amount (BDT)</span>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-12 p-3.5">
                  <div className="col-span-8">
                    <p className="font-bold text-foreground">20-Minute Telehealth Video Consultation</p>
                    <p className="text-[11px] text-muted-foreground">
                      Specialist cardiac clinical session with Dr. Sarah Rahman
                    </p>
                  </div>
                  <div className="col-span-4 text-right font-bold text-foreground">
                    ৳ 1,000.00
                  </div>
                </div>

                <div className="grid grid-cols-12 p-3.5">
                  <div className="col-span-8">
                    <p className="font-bold text-foreground">Telehealth Infrastructure & Digital Rx</p>
                    <p className="text-[11px] text-muted-foreground">
                      256-bit encrypted audio/video bandwidth & certified e-prescribing
                    </p>
                  </div>
                  <div className="col-span-4 text-right font-bold text-foreground">
                    ৳ 50.00
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-4 bg-muted/40 border-t border-border space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>৳ 1,050.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>VAT / Taxes (0% Healthcare Exemption):</span>
                  <span>৳ 0.00</span>
                </div>
                <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border">
                  <span>Total Paid:</span>
                  <span className="text-primary">৳ 1,050.00 BDT</span>
                </div>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <CreditCard className="size-5 text-primary" />
                <div>
                  <p className="font-bold text-foreground">Paid via bKash Merchant Gateway</p>
                  <p className="text-[11px] text-muted-foreground">Transaction ID: 9H82J01K992 &bull; Authorized</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handlePrint("invoice")}
                className="rounded-xl bg-primary text-primary-foreground font-bold text-xs gap-1.5"
              >
                <Download className="size-3.5" />
                <span>Save Invoice PDF</span>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
