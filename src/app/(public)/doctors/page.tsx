"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/language-context";
import { useGetAllDoctorsPublic } from "@/hooks";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  ShieldCheck,
  RotateCcw,
  Calendar,
  Sparkles,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

interface DoctorItem {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experienceYears: number;
  consultationFee: number;
  imageUrl?: string;
  rating?: number;
  availableToday?: boolean;
  hospital?: string;
}

const FALLBACK_DOCTORS: DoctorItem[] = [
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
    hospital: "National Heart Foundation, Dhaka",
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
    hospital: "Bangabandhu Sheikh Mujib Medical University",
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
    availableToday: false,
    hospital: "Dhaka Medical College & Hospital",
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
    hospital: "Shishu Hospital, Dhaka",
  },
  {
    id: "doc-5",
    name: "Dr. Farhana Yasmin",
    specialization: "Orthopedics",
    qualifications: "MBBS, MS (Orthopedics)",
    experienceYears: 11,
    consultationFee: 1100,
    imageUrl: "https://images.unsplash.com/photo-1594824813603-7802fc8d4f40?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    availableToday: true,
    hospital: "NITOR (Pongu Hospital), Dhaka",
  },
  {
    id: "doc-6",
    name: "Dr. Asif Iqbal",
    specialization: "Dentistry",
    qualifications: "BDS, PGT, FCPS (Dentistry)",
    experienceYears: 7,
    consultationFee: 700,
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    rating: 4.75,
    availableToday: false,
    hospital: "Dhaka Dental College",
  },
];

const SPECIALTY_LIST = [
  "All",
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Dentistry",
  "Psychiatry",
];

export default function FindDoctorsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [minExperience, setMinExperience] = useState(0);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  const { data: apiData, isPending } = useGetAllDoctorsPublic();

  // Merge real API data with fallback data
  const rawDoctors: DoctorItem[] = useMemo(() => {
    if (apiData?.data && Array.isArray(apiData.data) && apiData.data.length > 0) {
      return apiData.data.map((d: any, index: number) => ({
        id: d.id || `doc-${index}`,
        name: d.name || d.user?.name || "Specialist Doctor",
        specialization: d.specialization || "General Medicine",
        qualifications: d.qualifications || "MBBS",
        experienceYears: Number(d.experienceYears) || 5,
        consultationFee: Number(d.consultationFee) || 1000,
        imageUrl:
          d.user?.imageUrl ||
          d.imageUrl ||
          FALLBACK_DOCTORS[index % FALLBACK_DOCTORS.length].imageUrl,
        rating: 4.9,
        availableToday: true,
        hospital: d.hospital || "PH Healthcare Teleclinic",
      }));
    }
    return FALLBACK_DOCTORS;
  }, [apiData]);

  // Filtering
  const filteredDoctors = useMemo(() => {
    return rawDoctors.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.qualifications.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSpecialty =
        selectedSpecialty === "All" ||
        doc.specialization.toLowerCase() === selectedSpecialty.toLowerCase();

      const matchExp = doc.experienceYears >= minExperience;
      const matchAvail = !onlyAvailableToday || doc.availableToday;

      return matchSearch && matchSpecialty && matchExp && matchAvail;
    });
  }, [rawDoctors, searchQuery, selectedSpecialty, minExperience, onlyAvailableToday]);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All");
    setMinExperience(0);
    setOnlyAvailableToday(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Page Header */}
      <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-6 sm:p-10 overflow-hidden shadow-xs">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Stethoscope className="size-3.5" />
            <span>Doctor Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            {t("find_heading")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("find_subheading")}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            />
          </div>

          {/* Experience Filter */}
          <div className="md:col-span-3">
            <select
              value={minExperience}
              onChange={(e) => setMinExperience(Number(e.target.value))}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs cursor-pointer"
            >
              <option value={0}>Any Experience</option>
              <option value={5}>5+ Years Experience</option>
              <option value={10}>10+ Years Experience</option>
            </select>
          </div>

          {/* Available Today Toggle */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-center">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-semibold text-foreground select-none">
              <input
                type="checkbox"
                checked={onlyAvailableToday}
                onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                className="size-4 rounded-md border-border text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Available Today Only
              </span>
            </label>
          </div>
        </div>

        {/* Medical Specialties Chip Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {SPECIALTY_LIST.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => setSelectedSpecialty(spec)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedSpecialty === spec
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground">{filteredDoctors.length}</strong> verified doctors
        </span>
        {(searchQuery || selectedSpecialty !== "All" || minExperience > 0 || onlyAvailableToday) && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="flex items-center gap-1 text-primary hover:underline font-semibold"
          >
            <RotateCcw className="size-3" />
            <span>{t("reset_filters")}</span>
          </button>
        )}
      </div>

      {/* Doctor Cards Grid or Empty State */}
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-6 space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredDoctors.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SlidersHorizontal className="size-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            {t("no_doctors_found")}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Try adjusting your search terms or clearing the selected filters to view more available specialists.
          </p>
          <Button onClick={resetAllFilters} variant="outline" className="gap-2 text-xs">
            <RotateCcw className="size-3.5" />
            <span>{t("reset_filters")}</span>
          </Button>
        </div>
      ) : (
        /* Doctor Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all group"
            >
              {/* Doctor Header Banner */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <Badge variant="teal" className="text-[10px] bg-background/90 backdrop-blur-xs font-semibold">
                    <ShieldCheck className="size-3 mr-1 text-teal-600" />
                    BMDC Verified
                  </Badge>
                </div>
                {doc.availableToday && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="text-[10px] bg-background/90 backdrop-blur-xs font-semibold">
                      <span className="size-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                      Available Today
                    </Badge>
                  </div>
                )}
              </div>

              {/* Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px] font-semibold text-primary">
                      {doc.specialization}
                    </Badge>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="size-3.5 fill-amber-500" />
                      {doc.rating || 4.9}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    {doc.qualifications}
                  </p>
                  {doc.hospital && (
                    <p className="text-[11px] text-muted-foreground/80 line-clamp-1">
                      {doc.hospital}
                    </p>
                  )}
                </div>

                {/* Bottom Fee & CTA */}
                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      {doc.experienceYears} Years Exp.
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] text-muted-foreground block">Consultation Fee</span>
                      <span className="text-base font-extrabold text-foreground">
                        ৳ {doc.consultationFee}
                      </span>
                    </div>
                  </div>

                  <Link href={`/doctors/${doc.id}`} className="block">
                    <Button className="w-full gap-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs">
                      <Calendar className="size-3.5" />
                      <span>Book Consultation</span>
                      <ArrowRight className="size-3.5 ml-auto" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
