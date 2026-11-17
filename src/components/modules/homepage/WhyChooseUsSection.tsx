"use client";

import { useLanguage } from "@/context/language-context";
import { ShieldCheck, FileText, Video, Zap, Clock, Lock } from "lucide-react";

export default function WhyChooseUsSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t("why_f1_title"),
      description: t("why_f1_desc"),
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      icon: FileText,
      title: t("why_f2_title"),
      description: t("why_f2_desc"),
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Video,
      title: t("why_f3_title"),
      description: t("why_f3_desc"),
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Clock,
      title: t("why_f4_title"),
      description: t("why_f4_desc"),
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: Lock,
      title: "Bank-Grade Encryption",
      description: "HIPAA-ready security keeping your medical records and consultation history confidential.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      icon: Zap,
      title: "Fast Mobile Payments",
      description: "Pay with one click through bKash, Nagad, Visa, Mastercard with automatic invoice generation.",
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y border-border/80">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <span>{t("why_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("why_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            We are redefining telemedicine in Bangladesh with unmatched convenience, doctor quality, and verified technology.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all group"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} mb-5 transition-transform group-hover:scale-110`}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
