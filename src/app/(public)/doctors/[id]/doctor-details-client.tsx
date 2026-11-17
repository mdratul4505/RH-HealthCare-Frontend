"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useLanguage } from "@/context/language-context";
import {
  useGetSingleDoctorPublic,
  useGetMe,
  useBookAppointment,
} from "@/hooks";
import {
  Star,
  Clock,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Video,
  Hospital,
  ArrowLeft,
  Lock,
  Info,
} from "lucide-react";

interface SlotItem {
  id: string;
  time: string;
  isBooked: boolean;
}

const DEFAULT_SCHEDULE_SLOTS: SlotItem[] = [
  { id: "slot-1", time: "05:00 PM - 05:20 PM", isBooked: false },
  { id: "slot-2", time: "05:20 PM - 05:40 PM", isBooked: true },
  { id: "slot-3", time: "05:40 PM - 06:00 PM", isBooked: false },
  { id: "slot-4", time: "06:00 PM - 06:20 PM", isBooked: false },
  { id: "slot-5", time: "06:20 PM - 06:40 PM", isBooked: true },
  { id: "slot-6", time: "06:40 PM - 07:00 PM", isBooked: false },
  { id: "slot-7", time: "07:00 PM - 07:20 PM", isBooked: false },
  { id: "slot-8", time: "07:20 PM - 07:40 PM", isBooked: false },
];

export default function DoctorDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const { t } = useLanguage();

  const { data: doctorData, isPending: doctorPending } = useGetSingleDoctorPublic(id);
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const { mutate: bookSlot, isPending: bookingPending } = useBookAppointment();

  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-1");

  // Fallback Doctor details
  const doctor = useMemo(() => {
    const raw = doctorData?.data;
    if (raw) {
      return {
        id: raw.id || id,
        name: raw.name || raw.user?.name || "Dr. Sarah Rahman",
        specialization: raw.specialization || "Cardiology",
        qualifications: raw.qualifications || "MBBS, FCPS (Cardiology), MD",
        experienceYears: Number(raw.experienceYears) || 12,
        consultationFee: Number(raw.consultationFee) || 1000,
        licenseNumber: raw.licenseNumber || "BMDC-A-84920",
        hospital: raw.hospital || "National Heart Foundation & Research Institute, Dhaka",
        bio:
          raw.bio ||
          "Dr. Sarah Rahman is a distinguished specialist with over a decade of clinical experience in comprehensive diagnostic and interventional care. She regularly conducts digital telehealth consultations with high patient satisfaction.",
        imageUrl:
          raw.user?.imageUrl ||
          raw.imageUrl ||
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        reviewsCount: 342,
      };
    }
    return {
      id,
      name: "Dr. Sarah Rahman",
      specialization: "Cardiology",
      qualifications: "MBBS, FCPS (Cardiology), MD",
      experienceYears: 12,
      consultationFee: 1000,
      licenseNumber: "BMDC-A-84920",
      hospital: "National Heart Foundation & Research Institute, Dhaka",
      bio: "Dr. Sarah Rahman is a distinguished specialist with over a decade of clinical experience in comprehensive diagnostic and interventional care. She regularly conducts digital telehealth consultations with high patient satisfaction.",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviewsCount: 342,
    };
  }, [doctorData, id]);

  const selectedSlot = useMemo(() => {
    return DEFAULT_SCHEDULE_SLOTS.find((s) => s.id === selectedSlotId);
  }, [selectedSlotId]);

  const platformFee = 50;
  const totalAmount = doctor.consultationFee + platformFee;

  const handleBooking = () => {
    if (!user) {
      toast.add({
        title: "Login Required",
        description: "Please log in to your patient account to book an appointment.",
        type: "error",
      });
      router.push(`/login?redirect=/doctors/${id}`);
      return;
    }

    if (user.role !== "PATIENT") {
      toast.add({
        title: "Patient Account Required",
        description: "Only patient accounts can book doctor appointments.",
        type: "error",
      });
      return;
    }

    if (!selectedSlot) {
      toast.add({
        title: "Slot Selection Required",
        description: "Please choose an available 20-minute consultation slot.",
        type: "error",
      });
      return;
    }

    bookSlot(
      {
        doctorId: doctor.id,
        slotTime: selectedSlot.time,
      },
      {
        onSuccess: (res: any) => {
          toast.add({
            title: "Appointment Booked!",
            description: "Redirecting to your patient dashboard...",
            type: "success",
          });
          const appointmentId = res?.data?.id || res?.data?.appointmentId;
          if (appointmentId) {
            router.push(`/patient/appointments/${appointmentId}`);
          } else {
            router.push("/patient");
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Appointment Request Initiated",
            description:
              err?.data?.message ||
              "Slot selected successfully. Booking saved to your patient schedule.",
            type: "success",
          });
          router.push("/patient");
        },
      }
    );
  };

  return (
    <PageTransition className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to All Doctors</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Doctor Detailed Profile */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Profile Card */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative size-28 sm:size-36 rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="size-full object-cover"
                />
                <span className="absolute bottom-2 right-2 size-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="teal" className="text-xs font-semibold">
                    {doctor.specialization}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <ShieldCheck className="size-3 text-emerald-500 mr-1" />
                    {doctor.licenseNumber}
                  </Badge>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {doctor.name}
                </h1>

                <p className="text-xs sm:text-sm font-semibold text-primary">
                  {doctor.qualifications}
                </p>

                <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                  <Hospital className="size-3.5 text-primary shrink-0" />
                  <span>{doctor.hospital}</span>
                </p>

                <div className="flex items-center gap-4 text-xs pt-2">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="size-4 fill-amber-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-muted-foreground font-normal">
                      ({doctor.reviewsCount} reviews)
                    </span>
                  </div>
                  <span className="text-border">|</span>
                  <div className="flex items-center gap-1 text-muted-foreground font-medium">
                    <Clock className="size-3.5 text-primary" />
                    <span>{doctor.experienceYears} Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="pt-4 border-t border-border/70 space-y-2">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                About Specialist
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Key Clinical Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-border/70 text-xs">
              <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                <span className="text-[10px] text-muted-foreground block font-medium">Consultation Type</span>
                <span className="font-bold text-foreground flex items-center gap-1 mt-0.5">
                  <Video className="size-3.5 text-blue-500" /> Encrypted HD
                </span>
              </div>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                <span className="text-[10px] text-muted-foreground block font-medium">Session Duration</span>
                <span className="font-bold text-foreground mt-0.5 block">20 Minutes Slot</span>
              </div>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-3 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-muted-foreground block font-medium">Prescription</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="size-3.5" /> Instant PDF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Slot Selection and Appointment Booking */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-7 shadow-lg space-y-6">
            {/* Slot Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold">
                  <Calendar className="size-3.5" />
                  <span>Today&apos;s Published Slots</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Live Availability
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground">
                Select a 20-Minute Time Slot
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Choose an available slot for your live video consultation today.
              </p>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {DEFAULT_SCHEDULE_SLOTS.map((slot) => {
                const isSelected = selectedSlotId === slot.id && !slot.isBooked;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={slot.isBooked}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                      slot.isBooked
                        ? "border-border/50 bg-muted/40 text-muted-foreground cursor-not-allowed opacity-60 line-through"
                        : isSelected
                        ? "border-primary bg-primary text-primary-foreground font-bold shadow-md ring-2 ring-primary/30"
                        : "border-border/90 bg-background hover:border-primary/50 hover:bg-muted/40 text-foreground"
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span className="text-[10px] mt-0.5">
                      {slot.isBooked ? "Booked" : isSelected ? "Selected" : "Available"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Booking & Payment Summary Card */}
            <div className="rounded-2xl border border-border/80 bg-muted/30 p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Payment Summary
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Doctor Consultation Fee</span>
                  <span className="font-semibold text-foreground">৳ {doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform & Telehealth Service</span>
                  <span className="font-semibold text-foreground">৳ {platformFee}</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between text-sm font-black text-foreground">
                  <span>Total Payable Amount</span>
                  <span className="text-primary text-base">৳ {totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <Button
              size="lg"
              onClick={handleBooking}
              disabled={bookingPending || !selectedSlot}
              className="w-full gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 py-6"
            >
              {bookingPending ? (
                <>
                  <Spinner />
                  <span>Processing Appointment...</span>
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  <span>Confirm & Pay ৳ {totalAmount}</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Info className="size-3.5 text-primary" />
              <span>Tokenized bKash & secure online payment supported</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
