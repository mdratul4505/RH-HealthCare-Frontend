"use client";

import { useLanguage } from "@/context/language-context";
import { Search, CalendarCheck, CreditCard, Video } from "lucide-react";

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("how_step_1_title"),
      description: t("how_step_1_desc"),
      icon: Search,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-500/10",
      ring: "ring-teal-500/30",
    },
    {
      number: "02",
      title: t("how_step_2_title"),
      description: t("how_step_2_desc"),
      icon: CalendarCheck,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      ring: "ring-blue-500/30",
    },
    {
      number: "03",
      title: t("how_step_3_title"),
      description: t("how_step_3_desc"),
      icon: CreditCard,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      ring: "ring-indigo-500/30",
    },
    {
      number: "04",
      title: t("how_step_4_title"),
      description: t("how_step_4_desc"),
      icon: Video,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      ring: "ring-emerald-500/30",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <span>{t("how_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("how_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Get the specialized medical care you deserve in minutes without waiting in line at physical hospitals.
          </p>
        </div>

        {/* 4-Step Grid with Connecting Line */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-1/3 left-12 right-12 h-0.5 bg-gradient-to-r from-teal-500/30 via-blue-500/30 to-emerald-500/30 -z-1" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center rounded-2xl border border-border/80 bg-card p-6 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all group"
              >
                {/* Step Number Top Badge */}
                <div
                  className={`relative flex size-16 items-center justify-center rounded-2xl ${step.bg} ${step.color} ring-4 ${step.ring} shadow-md mb-6 transition-transform group-hover:scale-110`}
                >
                  <Icon className="size-8" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
