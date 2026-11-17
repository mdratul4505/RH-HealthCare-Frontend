"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import {
  Search,
  Calendar,
  ShieldCheck,
  Video,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 size-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{t("hero_badge")}</span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1 text-muted-foreground font-medium">
                <ShieldCheck className="size-3 text-emerald-600 dark:text-emerald-400" />
                BMDC Verified
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              <span className="block">{t("hero_title_1")}</span>
              <span className="bg-gradient-to-r from-primary via-teal-500 to-secondary bg-clip-text text-transparent">
                {t("hero_title_2")}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t("hero_description")}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/doctors" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground font-semibold px-6 shadow-md hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="size-4" />
                  <span>{t("hero_cta_find")}</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/#services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 font-medium px-6 hover:border-primary/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="size-4 text-primary" />
                  <span>{t("hero_cta_explore")}</span>
                </Button>
              </Link>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-border/70 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-foreground">150+</span>
                <span className="text-xs text-muted-foreground font-medium">{t("hero_stat_doctors")}</span>
              </div>
              <div className="flex flex-col border-x border-border/60 px-2 sm:px-4">
                <span className="text-xl sm:text-2xl font-black text-primary">25,000+</span>
                <span className="text-xs text-muted-foreground font-medium">{t("hero_stat_consultations")}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-foreground">98.5%</span>
                <span className="text-xs text-muted-foreground font-medium">{t("hero_stat_satisfaction")}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Showcase Card with Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Visual Medical Card Stack */}
            <div className="relative w-full max-w-md">
              {/* Main Medical Showcase Card */}
              <div className="relative z-10 rounded-3xl border border-border bg-card/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl transition-all hover:shadow-primary/5">
                {/* Doctor Avatar Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-border/80">
                  <div className="relative size-16 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                      alt="Dr. Sarah Rahman"
                      className="size-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 size-3 rounded-full bg-emerald-500 ring-2 ring-card" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">Dr. Sarah Rahman</h3>
                      <Badge variant="teal" className="text-[10px]">BMDC 84920</Badge>
                    </div>
                    <p className="text-xs font-semibold text-primary">Senior Cardiologist</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                      <Star className="size-3 fill-amber-500" />
                      <span className="font-bold">4.9</span>
                      <span className="text-muted-foreground">(320+ reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" /> Today&apos;s Slot
                    </span>
                    <span className="font-semibold text-foreground bg-primary/10 text-primary px-2.5 py-1 rounded-md">
                      07:20 PM - 07:40 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Video className="size-3.5 text-blue-500" /> Consultation Type
                    </span>
                    <span className="font-medium text-foreground">Encrypted HD Video</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span className="font-bold text-foreground text-sm">৳ 1,000 BDT</span>
                  </div>
                </div>

                {/* Booking Action */}
                <Link href="/doctors" className="block pt-2">
                  <Button className="w-full gap-2 bg-gradient-to-r from-primary to-teal-600 text-primary-foreground font-semibold py-5 rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]">
                    <Calendar className="size-4" />
                    <span>Book 20-Min Appointment</span>
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 pt-3 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span>Instant Confirmation & Digital Prescription</span>
                </div>
              </div>

              {/* Floating Badge 1: Top-Right Online Status with Motion Float */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-lg"
              >
                <div className="size-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                  <Video className="size-4" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-foreground">Live Teleconsult</p>
                  <p className="text-[10px] text-muted-foreground">HD Audio & Video</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom-Left Prescription with Motion Float */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-border bg-card p-3 shadow-lg"
              >
                <div className="size-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-foreground">Digital Prescription</p>
                  <p className="text-[10px] text-muted-foreground">Official PDF with verification</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
