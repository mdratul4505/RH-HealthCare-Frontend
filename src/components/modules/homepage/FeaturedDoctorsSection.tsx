"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import {
  Star,
  Clock,
  ShieldCheck,
  ArrowRight,
  Stethoscope,
  Calendar,
} from "lucide-react";

export interface IDoctorCardData {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experienceYears: number;
  consultationFee: number;
  imageUrl?: string;
  rating?: number;
  availableToday?: boolean;
}

const DEFAULT_DOCTORS: IDoctorCardData[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Rahman",
    specialization: "Cardiology",
    qualifications: "MBBS, FCPS (Cardiology), MD",
    experienceYears: 12,
    consultationFee: 1000,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    availableToday: true,
  },
  {
    id: "doc-2",
    name: "Dr. Tanvir Ahmed",
    specialization: "Neurology",
    qualifications: "MBBS, MD (Neurology), MRCP (UK)",
    experienceYears: 9,
    consultationFee: 1200,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    availableToday: true,
  },
  {
    id: "doc-3",
    name: "Dr. Nusrat Jahan",
    specialization: "Dermatology",
    qualifications: "MBBS, DDV, FCPS (Dermatology)",
    experienceYears: 8,
    consultationFee: 800,
    imageUrl: "https://images.unsplash.com/photo-1594824813576-932b509bc0c4?auto=format&fit=crop&w=400&q=80",
    rating: 4.95,
    availableToday: true,
  },
  {
    id: "doc-4",
    name: "Dr. Mahmudul Hasan",
    specialization: "Pediatrics",
    qualifications: "MBBS, DCH, MD (Pediatrics)",
    experienceYears: 14,
    consultationFee: 900,
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    rating: 4.85,
    availableToday: true,
  },
];

export default function FeaturedDoctorsSection({
  doctors = DEFAULT_DOCTORS,
}: {
  doctors?: IDoctorCardData[];
}) {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y border-border/80">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <Stethoscope className="size-3.5" />
              <span>{t("featured_badge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {t("featured_title")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("featured_subtitle")}
            </p>
          </div>

          <Link href="/doctors">
            <Button variant="outline" className="gap-2 font-semibold">
              <span>View All 150+ Doctors</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all group"
            >
              {/* Doctor Image with Badges */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <Badge variant="teal" className="text-[10px] bg-background/90 backdrop-blur-xs font-semibold">
                    <ShieldCheck className="size-3 mr-1 text-teal-600" />
                    Verified
                  </Badge>
                </div>
                {doc.availableToday && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="text-[10px] bg-background/90 backdrop-blur-xs font-semibold">
                      <span className="size-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                      {t("doc_available_today")}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Doctor Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="font-semibold text-primary">{doc.specialization}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="size-3 fill-amber-500" />
                      {doc.rating || 4.9}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {doc.qualifications}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3.5 text-primary" />
                      {doc.experienceYears} {t("doc_experience")}
                    </span>
                    <span className="font-extrabold text-foreground text-sm">
                      ৳ {doc.consultationFee}
                    </span>
                  </div>

                  <Link href={`/doctors/${doc.id}`} className="block">
                    <Button className="w-full gap-2 rounded-xl text-xs font-semibold">
                      <Calendar className="size-3.5" />
                      <span>{t("doc_view_profile")}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
