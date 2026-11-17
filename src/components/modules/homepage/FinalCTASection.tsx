"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import {
  Calendar,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Video,
} from "lucide-react";

export default function FinalCTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background border-t border-border/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-border/90 bg-card p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Dots */}
          <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 size-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Patient Booking */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" />
                <span>Modern Healthcare at Your Fingertips</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Ready to Experience Seamless Digital Healthcare?
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Join over 25,000 patients receiving professional online medical consultations, immediate digital prescriptions, and expert care.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/doctors" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90">
                    <Calendar className="size-4.5" />
                    <span>Find a Doctor Today</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 font-medium">
                    <span>Create Free Patient Account</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Doctor Recruitment Card */}
            <div className="lg:col-span-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 sm:p-7 space-y-4 shadow-sm text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                  <Stethoscope className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Are You a Medical Specialist?</h3>
                  <p className="text-xs text-muted-foreground">Expand your practice across Bangladesh</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Publish custom 20-minute consultation slots, meet patients over encrypted video calls, and issue digital prescriptions from any device.
              </p>

              <div className="space-y-2 text-xs text-foreground font-medium pt-1">
                <div className="flex items-center gap-2">
                  <Video className="size-3.5 text-primary" /> Flexible remote schedule
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="size-3.5 text-blue-500" /> Automated billing & direct payouts
                </div>
              </div>

              <Link href="/apply" className="block pt-2">
                <Button variant="outline" className="w-full justify-between border-primary/30 hover:border-primary text-primary font-semibold">
                  <span>Apply for Doctor Verification</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
