import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-primary/5 via-background to-background">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
        Compassionate Healthcare, Powered by Modern Technology
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Connect with verified specialist doctors, book appointments effortlessly, and manage your health records in one place.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/register">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="/apply">
          <Button size="lg" variant="outline">
            Apply as Doctor
          </Button>
        </Link>
      </div>
    </div>
  );
}
