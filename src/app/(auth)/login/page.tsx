import Logo from "@/assets/svg/logo";
import LoginForm from "@/components/form/login-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top bar: Back to Home & Logo */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 font-semibold text-sm">
            <Logo />
            <span>RH HealthCare</span>
          </Link>
        </div>

        {/* Center: Form */}
        <div className="my-auto py-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-6 space-y-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-xs text-muted-foreground">
          &copy; 2026 RH HealthCare. All rights reserved.
        </div>
      </div>

      {/* Image Section (Half of full page) */}
      <div className="relative hidden lg:flex items-center justify-center bg-muted/30 p-8 xl:p-12 border-l">
        <div className="relative w-full h-full max-w-lg max-h-[85vh]">
          <Image
            src="/login.webp"
            alt="Login illustration"
            fill
            priority
            sizes="50vw"
            className="object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
