import { Suspense } from "react";
import DoctorDetailsClient from "./doctor-details-client";
import { Spinner } from "@/components/ui/spinner";

async function DoctorDetailsInner({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DoctorDetailsClient id={id} />;
}

export default function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <Spinner className="size-8 text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Loading specialist profile and available schedule...
          </p>
        </div>
      }
    >
      <DoctorDetailsInner params={params} />
    </Suspense>
  );
}
