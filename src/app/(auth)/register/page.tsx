import Logo from "@/assets/svg/logo";
import RegisterForm from "@/components/form/register-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
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
          <div className="w-full max-w-md">
            <div className="mb-6 space-y-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your details to create your patient account
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-xs text-muted-foreground">
          &copy; 2026 RH HealthCare. All rights reserved.
        </div>
      </div>

      {/* Image Section (Half of full page) */}
      <div className="relative hidden lg:block bg-muted">
        <Image
          src="/register.jpg"
          alt="Register illustration"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
