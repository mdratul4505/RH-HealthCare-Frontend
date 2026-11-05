import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-6">
      <div className="rounded-full bg-destructive/10 p-4 text-destructive">
        <ShieldAlert className="size-12" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        You do not have permission to access this page. Please contact your administrator or return to dashboard.
      </p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
