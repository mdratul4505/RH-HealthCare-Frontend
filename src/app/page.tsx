import Header from "@/components/layout/public/Header";
import Footer from "@/components/layout/public/Footer";
import Hero from "@/components/modules/homepage/Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
