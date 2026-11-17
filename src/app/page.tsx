import Header from "@/components/layout/public/Header";
import Footer from "@/components/layout/public/Footer";
import HeroSection from "@/components/modules/homepage/HeroSection";
import StatsSection from "@/components/modules/homepage/StatsSection";
import SpecialtiesSection from "@/components/modules/homepage/SpecialtiesSection";
import FeaturedDoctorsSection from "@/components/modules/homepage/FeaturedDoctorsSection";
import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";
import WhyChooseUsSection from "@/components/modules/homepage/WhyChooseUsSection";
import AppointmentCTASection from "@/components/modules/homepage/AppointmentCTASection";
import TestimonialsSection from "@/components/modules/homepage/TestimonialsSection";
import FAQSection from "@/components/modules/homepage/FAQSection";
import FinalCTASection from "@/components/modules/homepage/FinalCTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Header />

      {/* Main Content with Exactly 10 Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Statistics Section */}
        <StatsSection />

        {/* 3. Medical Specialties Section */}
        <SpecialtiesSection />

        {/* 4. Featured Doctors Section */}
        <FeaturedDoctorsSection />

        {/* 5. How It Works Section */}
        <HowItWorksSection />

        {/* 6. Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* 7. Appointment CTA Promotional Section */}
        <AppointmentCTASection />

        {/* 8. Patient Testimonials Section */}
        <TestimonialsSection />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* 10. Final Call To Action Section */}
        <FinalCTASection />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}
