"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "bn";

export interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_brand: { en: "PH HealthCare", bn: "পিএইচ হেলথকেয়ার" },
  nav_home: { en: "Home", bn: "হোম" },
  nav_find_doctors: { en: "Find Doctors", bn: "ডাক্তার খুঁজুন" },
  nav_services: { en: "Services", bn: "সেবাসমূহ" },
  nav_how_it_works: { en: "How It Works", bn: "কিভাবে কাজ করে" },
  nav_about: { en: "About", bn: "আমাদের সম্পর্কে" },
  nav_contact: { en: "Contact", bn: "যোগাযোগ" },
  nav_join_doctor: { en: "Join as Doctor", bn: "ডাক্তার হিসেবে যোগ দিন" },
  nav_login: { en: "Login", bn: "লগইন" },
  nav_register: { en: "Register", bn: "রেজিস্ট্রেশন" },
  nav_dashboard: { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  nav_logout: { en: "Logout", bn: "লগআউট" },
  nav_profile: { en: "My Profile", bn: "আমার প্রোফাইল" },

  // Hero Section
  hero_badge: { en: "Trusted Telehealth Platform", bn: "বিশ্বস্ত টেলিহেলথ প্ল্যাটফর্ম" },
  hero_title_1: { en: "Compassionate Healthcare,", bn: "আধুনিক প্রযুক্তির সমন্বয়ে," },
  hero_title_2: { en: "Powered by Modern Technology", bn: "নির্ভরযোগ্য স্বাস্থ্যসেবা" },
  hero_description: {
    en: "Consult verified medical specialists online, receive digital prescriptions instantly, and book appointments with peace of mind.",
    bn: "অনলাইনে বিশেষজ্ঞ ডাক্তারদের পরামর্শ নিন, সাথে সাথেই ডিজিটাল প্রেসক্রিপশন পান এবং নিশ্চিন্তে অ্যাপয়েন্টমেন্ট বুক করুন।"
  },
  hero_cta_find: { en: "Find a Doctor", bn: "ডাক্তার খুঁজুন" },
  hero_cta_explore: { en: "Explore Services", bn: "সেবাসমূহ দেখুন" },
  hero_stat_doctors: { en: "Verified Doctors", bn: "ভেরিফাইড ডাক্তার" },
  hero_stat_consultations: { en: "Consultations Completed", bn: "সফল পরামর্শ" },
  hero_stat_satisfaction: { en: "Patient Satisfaction", bn: "রোগীর সন্তুষ্টি" },

  // Statistics Section
  stats_title: { en: "Trusted by Patients & Healthcare Professionals", bn: "হাজারো রোগী ও চিকিৎসকদের বিশ্বস্ত সঙ্গী" },
  stats_doctors: { en: "Specialist Doctors", bn: "বিশেষজ্ঞ চিকিৎসক" },
  stats_patients: { en: "Happy Patients", bn: "সন্তুষ্ট রোগী" },
  stats_consultations: { en: "Online Consultations", bn: "অনলাইন পরামর্শ" },
  stats_specialties: { en: "Medical Specialties", bn: "মেডিকেল বিভাগ" },

  // Medical Specialties
  specialties_badge: { en: "Our Departments", bn: "আমাদের বিভাগসমূহ" },
  specialties_title: { en: "Top Medical Specialties", bn: "জনপ্রিয় চিকিৎসা বিভাগসমূহ" },
  specialties_subtitle: {
    en: "Find experienced doctors across comprehensive specialties dedicated to your wellness.",
    bn: "আপনার সুস্বাস্থ্যের জন্য বিশেষজ্ঞ চিকিৎসকদের খুঁজে নিন।"
  },
  spec_cardiology: { en: "Cardiology", bn: "কার্ডিওলজি (হৃদরোগ)" },
  spec_dermatology: { en: "Dermatology", bn: "ডার্মাটোলজি (চর্মরোগ)" },
  spec_neurology: { en: "Neurology", bn: "নিউরোলজি (স্নায়ুরোগ)" },
  spec_pediatrics: { en: "Pediatrics", bn: "পেডিয়াট্রিক্স (শিশু স্বাস্থ্য)" },
  spec_dentistry: { en: "Dentistry", bn: "ডেন্টিস্ট্রি (দন্ত চিকিৎসা)" },
  spec_orthopedics: { en: "Orthopedics", bn: "অর্থোপেডিকস (হাড় ও জোড়)" },
  spec_ophthalmology: { en: "Ophthalmology", bn: "অপথ্যালমোলজি (চক্ষু রোগ)" },
  spec_psychiatry: { en: "Psychiatry", bn: "সাইকিয়াট্রি (মানসিক স্বাস্থ্য)" },
  spec_view_doctors: { en: "View Doctors", bn: "ডাক্তারদের দেখুন" },

  // Featured Doctors
  featured_badge: { en: "Meet the Specialists", bn: "বিশেষজ্ঞ চিকিৎসকবৃন্দ" },
  featured_title: { en: "Our Featured Doctors", bn: "আমাদের নির্বাচিত বিশেষজ্ঞ ডাক্তারগণ" },
  featured_subtitle: {
    en: "Top-rated doctors verified with BMDC registration ready for your online consultation.",
    bn: "বিএমডিসি অনুমোদিত শীর্ষ রেটেড চিকিৎসকদের সাথে পরামর্শ করুন।"
  },
  doc_experience: { en: "years exp.", bn: "বছরের অভিজ্ঞতা" },
  doc_fee: { en: "Consultation Fee", bn: "পরামর্শ ফি" },
  doc_view_profile: { en: "View Profile & Book", bn: "প্রোফাইল ও বুকিং" },
  doc_available_today: { en: "Available Today", bn: "আজ উপলব্ধ" },

  // How it works
  how_badge: { en: "Simple 4-Step Process", bn: "সহজ ৪টি ধাপ" },
  how_title: { en: "How PH HealthCare Works", bn: "কিভাবে সেবা গ্রহণ করবেন" },
  how_step_1_title: { en: "Find a Specialist", bn: "১. বিশেষজ্ঞ ডাক্তার খুঁজুন" },
  how_step_1_desc: { en: "Search by specialty, experience, or doctor name.", bn: "বিভাগ, অভিজ্ঞতা বা ডাক্তারের নাম অনুযায়ী খুঁজুন।" },
  how_step_2_title: { en: "Choose Available Slot", bn: "২. পছন্দের সময় বেছে নিন" },
  how_step_2_desc: { en: "Select a convenient 20-minute consultation slot today.", bn: "আজকের উপলব্ধ ২০ মিনিটের যেকোনো স্লট নির্বাচন করুন।" },
  how_step_3_title: { en: "Confirm & Secure Pay", bn: "৩. পেমেন্ট সম্পন্ন করুন" },
  how_step_3_desc: { en: "Pay securely via bKash or local online gateways.", bn: "বিকাশ বা কার্ডের মাধ্যমে নিরাপদে ফি পরিশোধ করুন।" },
  how_step_4_title: { en: "Join Video Consult", bn: "৪. ভিডিও কলে যুক্ত হোন" },
  how_step_4_desc: { en: "Meet your doctor online and receive digital prescription.", bn: "ডাক্তারের সাথে কথা বলুন ও ডিজিটাল প্রেসক্রিপশন নিন।" },

  // Why choose us
  why_badge: { en: "Our Advantages", bn: "আমাদের বৈশিষ্ট্য" },
  why_title: { en: "Why Patients Choose Us", bn: "কেন আমাদের বেছে নেবেন" },
  why_f1_title: { en: "100% Verified Doctors", bn: "১০০% ভেরিফাইড ডাক্তার" },
  why_f1_desc: { en: "Every doctor is thoroughly vetted with verified BMDC credentials.", bn: "সকল চিকিৎসক বিএমডিসি সনদ যাচাইকৃত।" },
  why_f2_title: { en: "Instant Digital Prescriptions", bn: "তাৎক্ষণিক ডিজিটাল প্রেসক্রিপশন" },
  why_f2_desc: { en: "Download formal medical prescriptions and invoices in PDF instantly.", bn: "পরামর্শ শেষে সাথে সাথে প্রেসক্রিপশন ডাউনলোড করুন।" },
  why_f3_title: { en: "Encrypted Video Calls", bn: "নিরাপদ ভিডিও কনসাল্টেশন" },
  why_f3_desc: { en: "End-to-end encrypted high-definition consultations from home.", bn: "সম্পূর্ণ সুরক্ষিত ও গোপনীয় ভিডিও কনসাল্টেশন।" },
  why_f4_title: { en: "Zero Waiting Queue", bn: "কোনো সিরিয়াল ঝক্কি নেই" },
  why_f4_desc: { en: "Dedicated 20-minute time slots directly with your specialist.", bn: "নির্দিষ্ট সময়ে সরাসরি ডাক্তারের পরামর্শ নিন।" },

  // Appointment CTA
  promo_title: { en: "Need Urgent Medical Advice Today?", bn: "আজই কি কোনো জরুরি পরামর্শ প্রয়োজন?" },
  promo_desc: {
    en: "Our top specialist doctors are available for same-day video appointments. Book in less than 2 minutes.",
    bn: "আমাদের বিশেষজ্ঞ ডাক্তাররা আজকের জন্য উপলব্ধ আছেন। মাত্র ২ মিনিটে বুক করুন।"
  },
  promo_cta: { en: "Book an Appointment Now", bn: "এখনই অ্যাপয়েন্টমেন্ট বুক করুন" },
  promo_hotline: { en: "Emergency Hotline: +880 1912-345678", bn: "জরুরি হটলাইন: +৮৮০ ১৯১২-৩৪৫৬৭৮" },

  // Testimonials
  test_badge: { en: "Real Stories", bn: "রোগীদের অভিজ্ঞতা" },
  test_title: { en: "What Our Patients Say", bn: "রোগীরা আমাদের সম্পর্কে যা বলছেন" },

  // FAQ
  faq_badge: { en: "Got Questions?", bn: "সাধারণ জিজ্ঞাসা" },
  faq_title: { en: "Frequently Asked Questions", bn: "সাধারণ প্রশ্নোত্তর" },

  // Footer
  footer_tagline: {
    en: "Modern online healthcare platform connecting patients with certified specialist doctors anytime, anywhere.",
    bn: "যেকোনো সময়, যেকোনো স্থান থেকে বিশেষজ্ঞ চিকিৎসকদের সাথে যুক্ত হওয়ার আধুনিক প্ল্যাটফর্ম।"
  },
  footer_quick_links: { en: "Quick Links", bn: "প্রয়োজনীয় লিংক" },
  footer_specialties: { en: "Specialties", bn: "চিকিৎসা বিভাগ" },
  footer_contact_us: { en: "Contact Us", bn: "যোগাযোগ করুন" },
  footer_rights: { en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" },

  // Doctor Discovery & Details
  find_heading: { en: "Find Your Specialist Doctor", bn: "আপনার বিশেষজ্ঞ ডাক্তার খুঁজুন" },
  find_subheading: { en: "Search and filter among certified physicians ready to consult with you today.", bn: "আজকের জন্য প্রস্তুত চিকিৎসকদের তালিকা থেকে অনুসন্ধান করুন।" },
  search_placeholder: { en: "Search by doctor name or qualification...", bn: "ডাক্তারের নাম বা ডিগ্রি দিয়ে অনুসন্ধান করুন..." },
  filter_specialty: { en: "All Specialties", bn: "সকল বিভাগ" },
  filter_experience: { en: "Experience", bn: "অভিজ্ঞতা" },
  filter_fee: { en: "Consultation Fee", bn: "পরামর্শ ফি" },
  no_doctors_found: { en: "No doctors found matching your criteria", bn: "আপনার শর্ত অনুযায়ী কোনো ডাক্তার পাওয়া যায়নি" },
  reset_filters: { en: "Reset Filters", bn: "ফিল্টার মুছুন" },
  book_slot: { en: "Select Schedule Slot", bn: "স্লট নির্বাচন করুন" },
  available_slots_today: { en: "Today's Published Slots (20 Min Each)", bn: "আজকের সময়সূচী (প্রতিটি ২০ মিনিট)" },
  slot_available: { en: "Available", bn: "উপলব্ধ" },
  slot_booked: { en: "Booked", bn: "বুকড" },
  booking_summary: { en: "Appointment Summary", bn: "অ্যাপয়েন্টমেন্ট বিবরণী" },
  proceed_payment: { en: "Confirm & Pay via bKash", bn: "নিশ্চিত করুন ও পেমেন্ট করুন" },

  // Auth
  auth_login_title: { en: "Welcome Back", bn: "স্বাগতম" },
  auth_login_subtitle: { en: "Enter your credentials to access your account", bn: "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন" },
  auth_register_title: { en: "Create an Account", bn: "নতুন অ্যাকাউন্ট তৈরি করুন" },
  auth_register_subtitle: { en: "Join thousands of patients receiving modern healthcare", bn: "স্বাস্থ্যসেবা গ্রহণের জন্য যুক্ত হোন" },
  auth_google_continue: { en: "Continue with Google", bn: "গুগল দিয়ে প্রবেশ করুন" },
  auth_or: { en: "Or continue with email", bn: "অথবা ইমেইল দিয়ে এগিয়ে যান" },
  auth_forgot_password: { en: "Forgot password?", bn: "পাসওয়ার্ড ভুলে গেছেন?" },
  auth_have_account: { en: "Already have an account?", bn: "ইতিমধ্যে অ্যাকাউন্ট আছে?" },
  auth_no_account: { en: "Don't have an account?", bn: "অ্যাকাউন্ট নেই?" },
  auth_apply_doctor: { en: "Apply as Doctor", bn: "ডাক্তার হিসেবে আবেদন" },

  // Dashboards
  dash_welcome: { en: "Welcome back", bn: "স্বাগতম" },
  dash_upcoming: { en: "Upcoming Appointments", bn: "আসন্ন অ্যাপয়েন্টমেন্ট" },
  dash_total_consultations: { en: "Total Consultations", bn: "মোট পরামর্শ" },
  dash_prescriptions: { en: "Digital Prescriptions", bn: "ডিজিটাল প্রেসক্রিপশন" },
  dash_payments: { en: "Payment History", bn: "পেমেন্ট হিস্ট্রি" },
  dash_join_video: { en: "Join Video Consultation", bn: "ভিডিও কনসাল্টেশনে যোগ দিন" },
  dash_download_prescription: { en: "Download Prescription (PDF)", bn: "প্রেসক্রিপশন ডাউনলোড (PDF)" },
  dash_download_invoice: { en: "Download Invoice (PDF)", bn: "ইনভয়েস ডাউনলোড (PDF)" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ph_language") as Language | null;
    if (saved && (saved === "en" || saved === "bn")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ph_language", lang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
