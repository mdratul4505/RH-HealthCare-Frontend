"use client";

import { useLanguage } from "@/context/language-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQSection() {
  const { t } = useLanguage();

  const faqs = [
    {
      q: "How does the online consultation work?",
      a: "Simply browse through our verified specialist doctors, select an available 20-minute slot today, and complete payment via bKash or card. At appointment time, click 'Join Video Consultation' from your dashboard to connect with the doctor directly from your phone or laptop.",
    },
    {
      q: "Are the doctors verified by Bangladesh Medical & Dental Council (BMDC)?",
      a: "Yes! Every single doctor on PH HealthCare undergoes rigorous credential verification with their BMDC registration number, MBBS and specialist certifications before being approved to consult patients.",
    },
    {
      q: "How do I receive my prescription and invoice after consultation?",
      a: "Immediately following the video consultation, the doctor prepares and submits your digital prescription. You can view, download, and print your official signed PDF prescription and payment receipt anytime from your Patient Dashboard.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support seamless tokenized bKash payments, Nagad, as well as Visa, Mastercard, and American Express cards. Transactions are 100% secure with instant confirmation.",
    },
    {
      q: "Can I reschedule or cancel my appointment?",
      a: "Yes. Patients can cancel or manage appointments directly from their dashboard in accordance with our cancellation policy prior to the scheduled consultation window.",
    },
    {
      q: "How do doctors join and publish their schedules on PH HealthCare?",
      a: "Doctors can click 'Join as Doctor' to submit their BMDC license, qualification details, and resume. Once verified and approved by the Medical Admin, doctors can set up customized 20-minute time slots in their Doctor Dashboard.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <HelpCircle className="size-3.5" />
            <span>{t("faq_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("faq_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything you need to know about booking, appointments, doctors, and telehealth services.
          </p>
        </div>

        {/* FAQs Accordion */}
        <Accordion className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} defaultOpen={idx === 0}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
