"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { Calendar, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";

export default function AppointmentCTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-primary via-teal-700 to-teal-900 text-primary-foreground p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Background Decorative Circles */}
          <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 -top-20 size-60 rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-white">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>Same-Day Video Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {t("promo_title")}
            </h2>

            <p className="text-sm sm:text-base text-primary-foreground/90 leading-relaxed font-normal">
              {t("promo_desc")}
            </p>

            {/* Quick Benefits Checklist */}
            <div className="flex flex-wrap gap-4 text-xs font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-teal-200" /> 20-Minute Dedicated Slot
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-teal-200" /> Instant PDF Prescription
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-teal-200" /> Secure Online Payment
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/doctors" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-white text-teal-900 font-bold px-7 hover:bg-white/95 shadow-lg text-sm sm:text-base"
                >
                  <Calendar className="size-4.5" />
                  <span>{t("promo_cta")}</span>
                </Button>
              </Link>
              <a
                href="tel:+8801912345678"
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white/90 hover:text-white px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="size-4 text-amber-300" />
                <span>{t("promo_hotline")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
