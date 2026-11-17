import AuthSplitLayout from "@/components/layout/auth/AuthSplitLayout";
import RegisterForm from "@/components/form/register-form";

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      title="Create Patient Account"
      subtitle="Join thousands of patients booking secure digital doctor consultations and e-prescriptions."
    >
      <RegisterForm />
    </AuthSplitLayout>
  );
}
