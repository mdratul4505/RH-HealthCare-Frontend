"use client";

import Link from "next/link";
import Logo from "@/assets/svg/logo";
import { useLanguage } from "@/context/language-context";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/80 bg-card text-foreground transition-colors mt-auto">
      {/* Top Banner: Emergency & Assurance */}
      <div className="border-b border-border/60 bg-primary/5 py-4 px-4 sm:px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-primary">24/7 Digital Consultation Available:</span>
            <span>Immediate access to specialist medical advice online.</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground font-semibold">
            <a
              href="tel:+8801912345678"
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="size-3.5 text-primary" />
              <span>+880 1912-345678</span>
            </a>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="size-3.5" />
              <span>BMDC Certified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Logo />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                {t("nav_brand")}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t("footer_tagline")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/50 px-3 py-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5 text-primary" />
                <span>Fast 20-min slots</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/50 px-3 py-1.5 text-xs text-muted-foreground">
                <Sparkles className="size-3.5 text-teal-500" />
                <span>Digital Invoices & Rx</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t("nav_home")}
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-primary transition-colors">
                  {t("nav_find_doctors")}
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-primary transition-colors">
                  {t("nav_join_doctor")}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  {t("nav_login")}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  {t("nav_register")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t("footer_specialties")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/doctors?specialty=Cardiology" className="hover:text-primary transition-colors">
                  Cardiology
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=Neurology" className="hover:text-primary transition-colors">
                  Neurology
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=Dermatology" className="hover:text-primary transition-colors">
                  Dermatology
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=Pediatrics" className="hover:text-primary transition-colors">
                  Pediatrics
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=Orthopedics" className="hover:text-primary transition-colors">
                  Orthopedics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t("footer_contact_us")}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Level 4, PH Health Tower, Banani, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-primary shrink-0" />
                <a href="tel:+8801912345678" className="hover:text-primary transition-colors">
                  +880 1912-345678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-primary shrink-0" />
                <a href="mailto:support@rhhealthcare.com" className="hover:text-primary transition-colors">
                  support@rhhealthcare.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; 2026 {t("nav_brand")}. {t("footer_rights")}
          </p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Built with care for modern telehealth</span>
            <Heart className="size-3.5 text-rose-500 fill-rose-500 inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
