"use client";

import { useLanguage } from "@/context/language-context";
import { Users, Stethoscope, Video, Award } from "lucide-react";

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Stethoscope,
      value: "150+",
      label: t("stats_doctors"),
      description: "Certified & BMDC-verified specialist doctors",
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      icon: Users,
      value: "25,000+",
      label: t("stats_patients"),
      description: "Treated and consulted across Bangladesh",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Video,
      value: "35,000+",
      label: t("stats_consultations"),
      description: "Completed with digital prescription issuance",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      icon: Award,
      value: "40+",
      label: t("stats_specialties"),
      description: "Covering cardiology, neurology, pediatrics & more",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <section className="py-12 border-y border-border/80 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold tracking-tight text-foreground">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
