"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/svg/logo";
import { UserRole } from "@/types";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.type";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  Users,
  KeyRound,
  FileText,
  Video,
  Calendar,
  Clock,
  FileCheck2,
  Banknote,
  Receipt,
  LogOut,
  ChevronRight,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  Users,
  KeyRound,
  FileText,
  Video,
  Calendar,
  Clock,
  FileCheck2,
  Banknote,
  Receipt,
};

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  DOCTOR: doctorRoutes,
  PATIENT: patientRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const routes: SidebarItems = sidebarRoutes[role] || [];

  const { data: userData } = useGetMe();
  const user = userData?.data;
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.add({
          title: "Logged Out",
          description: "You have been signed out successfully.",
          type: "success",
        });
        router.push("/login");
      },
    });
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case "SUPER_ADMIN":
        return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Super Admin</Badge>;
      case "ADMIN":
        return <Badge variant="indigo" className="text-[10px] px-2 py-0.5">Admin</Badge>;
      case "DOCTOR":
        return <Badge variant="teal" className="text-[10px] px-2 py-0.5">Doctor</Badge>;
      case "PATIENT":
        return <Badge variant="emerald" className="text-[10px] px-2 py-0.5">Patient</Badge>;
      default:
        return null;
    }
  };

  return (
    <Sidebar className="border-r border-border/80 bg-sidebar">
      {/* Brand Header */}
      <SidebarHeader className="p-4 border-b border-border/60">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-transform">
              <Logo />
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight text-foreground block">
                PH HealthCare
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                Clinical Telehealth
              </span>
            </div>
          </Link>
          {getRoleBadge(role)}
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-2 py-4 space-y-6">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-1">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon ? ICON_MAP[item.icon] || LayoutDashboard : LayoutDashboard;
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-4 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-primary/10 text-primary"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* User Footer Profile & Sign Out */}
      <SidebarFooter className="p-3 border-t border-border/60 bg-muted/20">
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-card border border-border/70 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar className="size-8 rounded-xl border border-primary/20 shrink-0">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">
                {user?.name || "Healthcare User"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user?.email || "user@ph.com"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutPending}
            className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
            title="Log Out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
