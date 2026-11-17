"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import {
  HeartPulse,
  Brain,
  Sparkles,
  Baby,
  Smile,
  Activity,
  Eye,
  SmilePlus,
  ArrowRight,
} from "lucide-react";

export default function SpecialtiesSection() {
  const { t } = useLanguage();

  const specialties = [
    {
      name: "Cardiology",
      label: t("spec_cardiology"),
      description: "Heart conditions, hypertension, chest pain, and cardiac care.",
      icon: HeartPulse,
      count: "24 Doctors",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      borderHover: "group-hover:border-rose-500/40",
    },
    {
      name: "Neurology",
      label: t("spec_neurology"),
      description: "Brain, nerves, stroke recovery, migraine, and neurological health.",
      icon: Brain,
      count: "18 Doctors",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      borderHover: "group-hover:border-purple-500/40",
    },
    {
      name: "Dermatology",
      label: t("spec_dermatology"),
      description: "Skin, hair, allergic reactions, acne, and aesthetic treatments.",
      icon: Sparkles,
      count: "20 Doctors",
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      borderHover: "group-hover:border-teal-500/40",
    },
    {
      name: "Pediatrics",
      label: t("spec_pediatrics"),
      description: "Child wellness, infant nutrition, vaccinations, and growth.",
      icon: Baby,
      count: "16 Doctors",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      borderHover: "group-hover:border-sky-500/40",
    },
    {
      name: "Orthopedics",
      label: t("spec_orthopedics"),
      description: "Bone health, joint pains, sports injuries, and arthritis care.",
      icon: Activity,
      count: "15 Doctors",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      borderHover: "group-hover:border-amber-500/40",
    },
    {
      name: "Dentistry",
      label: t("spec_dentistry"),
      description: "Oral hygiene, root canal, teeth alignment, and dental consultation.",
      icon: Smile,
      count: "12 Doctors",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      borderHover: "group-hover:border-emerald-500/40",
    },
    {
      name: "Ophthalmology",
      label: t("spec_ophthalmology"),
      description: "Vision clarity, eye infection, glaucoma, and retina checkups.",
      icon: Eye,
      count: "14 Doctors",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      borderHover: "group-hover:border-blue-500/40",
    },
    {
      name: "Psychiatry",
      label: t("spec_psychiatry"),
      description: "Mental well-being, stress, anxiety counseling, and depression care.",
      icon: SmilePlus,
      count: "11 Doctors",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      borderHover: "group-hover:border-pink-500/40",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <span>{t("specialties_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("specialties_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("specialties_subtitle")}
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <Link
                key={spec.name}
                href={`/doctors?specialty=${spec.name}`}
                className="group"
              >
                <div
                  className={`relative flex flex-col justify-between h-full rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:shadow-lg hover:-translate-y-1 ${spec.borderHover}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`flex size-12 items-center justify-center rounded-2xl ${spec.bg} ${spec.color} transition-transform group-hover:scale-110`}
                      >
                        <Icon className="size-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                        {spec.count}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {spec.label}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {spec.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{t("spec_view_doctors")}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
