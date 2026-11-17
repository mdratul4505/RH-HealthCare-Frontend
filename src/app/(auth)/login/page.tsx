import AuthSplitLayout from "@/components/layout/auth/AuthSplitLayout";
import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="Welcome Back"
      subtitle="Sign in to manage your consultations, appointments, or medical board practice."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}
