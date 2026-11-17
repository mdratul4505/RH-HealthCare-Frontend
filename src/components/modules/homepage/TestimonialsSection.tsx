"use client";

import { useLanguage } from "@/context/language-context";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: "Mohammad Arifur Rahman",
      location: "Gulshan, Dhaka",
      specialtyTreated: "Cardiology Consultation",
      doctorName: "Dr. Sarah Rahman",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      text: "Booking with Dr. Sarah was seamless. Within 15 minutes of booking, I was in a crystal-clear video consultation. She analyzed my ECG reports and sent a signed digital prescription directly to my dashboard.",
    },
    {
      name: "Tanjina Akter",
      location: "Chittagong",
      specialtyTreated: "Dermatology Follow-up",
      doctorName: "Dr. Nusrat Jahan",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      text: "I was struggling with chronic skin allergies and had no time to travel to Dhaka. Dr. Nusrat diagnosed the issue over video call and guided me with precision. Excellent platform!",
    },
    {
      name: "Kamrul Hasan",
      location: "Sylhet",
      specialtyTreated: "Pediatric Consultation",
      doctorName: "Dr. Mahmudul Hasan",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      text: "Our 4-year-old child had a sudden high fever at night. Getting an appointment with a top pediatrician in 20 minutes was a lifesaver. The doctor was so patient and comforting.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y border-border/80">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Quote className="size-3" />
            <span>{t("test_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("test_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Real feedback from thousands of patients across Bangladesh who received timely specialist care through PH HealthCare.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all"
            >
              <div className="space-y-4">
                {/* Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-500" />
                    ))}
                  </div>
                  <Badge variant="teal" className="text-[10px]">
                    <CheckCircle2 className="size-3 mr-1 text-teal-600" />
                    Verified Patient
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-3">
                <Avatar
                  src={rev.avatar}
                  fallback={rev.name}
                  className="size-11 border-2 border-primary/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {rev.location} &bull; <span className="text-primary font-medium">{rev.specialtyTreated}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
