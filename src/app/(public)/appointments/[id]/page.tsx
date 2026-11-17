import { Suspense } from "react";
import AppointmentDetailsClient from "./appointment-details-client";
import { Spinner } from "@/components/ui/spinner";

async function AppointmentInner({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AppointmentDetailsClient id={id} />;
}

export default function AppointmentDetailsPage({
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
            Loading consultation studio and medical records...
          </p>
        </div>
      }
    >
      <AppointmentInner params={params} />
    </Suspense>
  );
}
