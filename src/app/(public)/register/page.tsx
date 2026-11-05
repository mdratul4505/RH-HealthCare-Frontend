import RegisterForm from "@/components/form/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your information to get started with RH HealthCare
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
