"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Logo from "@/assets/svg/logo";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import {
  ArrowLeft,
  ShieldCheck,
  Video,
  Star,
  HeartPulse,
  Sparkles,
  Users,
} from "lucide-react";

interface AuthSplitLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthSplitLayout({
  children,
  title,
  subtitle,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-background">
      {/* Left Column: Visual Healthcare Hero Showcase */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-950 text-white overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="size-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2 text-white shadow-md group-hover:scale-105 transition-transform">
              <Logo />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block">
                PH HealthCare
              </span>
              <span className="text-[11px] font-medium text-teal-200">
                Online Doctor Consultation
              </span>
            </div>
          </Link>
        </div>

        {/* Middle: Value Proposition & Features */}
        <div className="relative z-10 space-y-6 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-teal-200 backdrop-blur-md">
            <Sparkles className="size-3.5 text-teal-300" />
            <span>Trusted Telehealth Ecosystem</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Accessible, certified healthcare right from your screen.
          </h2>

          <p className="text-sm text-teal-100/90 leading-relaxed max-w-md">
            Connect with certified medical specialists in real time. Select your preferred 20-minute slot, join encrypted video sessions, and receive instant digital prescriptions.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="size-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">100% BMDC Verified Doctors</p>
                <p className="text-teal-200/80">Every physician is strictly verified by our clinical board.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="size-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                <Video className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Encrypted HD Video Sessions</p>
                <p className="text-teal-200/80">Private end-to-end encrypted consultations with one click.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="size-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <HeartPulse className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Instant Digital Prescriptions</p>
                <p className="text-teal-200/80">Download authenticated PDF prescriptions right after consultation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Patient Trust Quote */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-teal-200/90">
          <div className="flex items-center gap-1.5 text-amber-400">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white ml-1">4.9/5</span>
          </div>
          <span className="text-[11px] text-teal-200/80">
            12,000+ Consultations Completed
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Form Screen */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Go to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-6 space-y-1.5 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
            {children}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground pt-4">
          &copy; 2026 PH HealthCare System. Safe & HIPAA Compliant Telehealth Platform.
        </div>
      </div>
    </div>
  );
}
