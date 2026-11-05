import Header from "@/components/layout/public/Header";
import Footer from "@/components/layout/public/Footer";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
