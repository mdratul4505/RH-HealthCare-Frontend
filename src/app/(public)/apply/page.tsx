import DoctorApplyForm from "@/components/form/doctor-apply-form";

export default function DoctorApplyPage() {
  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Doctor Application</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Apply to join our network of certified healthcare professionals
        </p>
      </div>
      <DoctorApplyForm />
    </div>
  );
}
