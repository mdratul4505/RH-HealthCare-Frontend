import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
