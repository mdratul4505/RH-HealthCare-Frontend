"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { ReactNode } from "react";
import { UserRole } from "@/types";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useGetMe } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  ChevronRight,
  Home,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  const pathname = usePathname();
  const { data: userData } = useGetMe();
  const user = userData?.data;
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Generate dynamic breadcrumb segment
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentSection = pathSegments[pathSegments.length - 1] || "Overview";

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset className="bg-background min-h-screen flex flex-col">
        {/* Top Executive Header */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/70 bg-card/80 px-4 sm:px-6 backdrop-blur-md">
          {/* Left: Trigger and Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <SidebarTrigger className="-ml-1" />
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <Home className="size-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="size-3.5 text-muted-foreground/50" />
              <span className="capitalize font-medium text-foreground">
                {role.toLowerCase().replace("_", " ")} Portal
              </span>
              <ChevronRight className="size-3.5 text-muted-foreground/50" />
              <span className="font-semibold text-primary capitalize">
                {currentSection.replace("-", " ")}
              </span>
            </div>
          </div>

          {/* Right: Actions, Notifications, Theme, Language, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setNotificationOpen(true)}
              className="relative size-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-emerald-500 ring-2 ring-card" />
            </button>

            <LanguageSwitcher />
            <ThemeSwitcher />

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border/80">
              <Avatar className="size-8 rounded-xl border border-primary/20">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-left text-xs leading-tight hidden md:block">
                <p className="font-bold text-foreground truncate max-w-[120px]">
                  {user?.name || "User"}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {user?.role?.toLowerCase() || "Role"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/20">
          {children}
        </main>

        {/* Notifications Modal */}
        <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <Bell className="size-5 text-primary" />
                System Notifications
              </DialogTitle>
              <DialogDescription className="text-xs">
                Real-time updates regarding your consultations, schedules, and account activities.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="rounded-2xl border border-border bg-card p-3.5 flex items-start gap-3">
                <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-foreground">Next Consultation Ready</p>
                  <p className="text-muted-foreground">
                    Your upcoming 20-minute video session is confirmed and ready to join.
                  </p>
                  <span className="text-[10px] text-primary font-medium block pt-1">Just now</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-3.5 flex items-start gap-3">
                <div className="size-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="size-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-foreground">System Security Notice</p>
                  <p className="text-muted-foreground">
                    HIPAA-compliant end-to-end video encryption is active across all consultations.
                  </p>
                  <span className="text-[10px] text-muted-foreground block pt-1">2 hours ago</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
