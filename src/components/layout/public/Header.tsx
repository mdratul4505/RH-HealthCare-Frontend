"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/context/language-context";
import { useGetMe, useLogout } from "@/hooks";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  ChevronDown,
  PhoneCall,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { data: userData, isPending } = useGetMe();
  const user = userData?.data;
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.add({
          title: "Logged Out",
          description: "You have been logged out safely.",
          type: "success",
        });
        setProfileDropdownOpen(false);
        router.push("/login");
        router.refresh();
      },
      onError: () => {
        toast.add({
          title: "Logout Error",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  const getDashboardRoute = (role?: string) => {
    switch (role) {
      case "DOCTOR":
        return "/doctor";
      case "ADMIN":
      case "SUPER_ADMIN":
        return "/admin";
      case "PATIENT":
      default:
        return "/patient";
    }
  };

  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_find_doctors"), href: "/doctors" },
    { label: t("nav_services"), href: "/#services" },
    { label: t("nav_how_it_works"), href: "/#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
            <Logo />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5">
              {t("nav_brand")}
              <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[10px] text-muted-foreground font-medium -mt-1 tracking-wider uppercase">
              Telehealth Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary hover:bg-muted/60",
                  isActive
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="hidden md:flex items-center gap-2.5">
          <LanguageSwitcher />
          <ThemeSwitcher />

          {!isPending && user ? (
            /* Logged-in User Menu */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-full border border-border p-1 pr-3 hover:bg-muted/60 transition-colors"
              >
                <Avatar
                  src={user.imageUrl}
                  fallback={user.name || user.email || "U"}
                  className="size-7"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground max-w-[100px] truncate">
                    {user.name || "User"}
                  </span>
                  <span className="text-[10px] text-primary font-medium capitalize">
                    {user.role?.toLowerCase().replace("_", " ")}
                  </span>
                </div>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-border/60 mb-1">
                    <p className="text-xs font-bold text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <Badge variant="teal" className="mt-1.5 text-[10px]">
                      {user.role}
                    </Badge>
                  </div>

                  <Link
                    href={getDashboardRoute(user.role)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="size-4 text-primary" />
                    <span>{t("nav_dashboard")}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutPending}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="size-4" />
                    <span>{t("nav_logout")}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out Call to Actions */
            <div className="flex items-center gap-2">
              <Link href="/apply">
                <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                  <Stethoscope className="size-3.5 text-primary" />
                  <span>{t("nav_join_doctor")}</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-xs">
                  {t("nav_login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-xs bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
                  {t("nav_register")}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-foreground"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-md px-4 py-4 space-y-3 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex flex-col gap-2">
            {!isPending && user ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 rounded-xl">
                  <Avatar src={user.imageUrl} fallback={user.name || "U"} className="size-8" />
                  <div>
                    <p className="text-xs font-bold text-foreground">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Link
                  href={getDashboardRoute(user.role)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-start gap-2" size="sm">
                    <LayoutDashboard className="size-4" />
                    <span>{t("nav_dashboard")}</span>
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="size-4" />
                  <span>{t("nav_logout")}</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                    <Stethoscope className="size-4 text-primary" />
                    <span>{t("nav_join_doctor")}</span>
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      {t("nav_login")}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      {t("nav_register")}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
