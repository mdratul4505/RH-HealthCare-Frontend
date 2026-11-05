import Link from "next/link";
import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold tracking-tight">RH HealthCare</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/apply">
            <Button variant="ghost" size="sm">
              Join as Doctor
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
