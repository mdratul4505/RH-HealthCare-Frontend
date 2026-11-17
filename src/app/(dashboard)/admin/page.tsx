"use client";

import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import { useGetMe } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import {
  ShieldCheck,
  Users,
  Stethoscope,
  Video,
  KeyRound,
  Plus,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  isBlocked: boolean;
  createdAt: string;
}

const INITIAL_ADMINS: AdminUser[] = [
  {
    id: "adm-1",
    name: "System Super Administrator",
    email: "superadmin@gmail.com",
    role: "SUPER_ADMIN",
    isBlocked: false,
    createdAt: "2026-01-10",
  },
  {
    id: "adm-2",
    name: "Clinical Operations Lead",
    email: "admin.ops@ph-healthcare.com",
    role: "ADMIN",
    isBlocked: false,
    createdAt: "2026-03-15",
  },
  {
    id: "adm-3",
    name: "Doctor Verification Officer",
    email: "verify.board@ph-healthcare.com",
    role: "ADMIN",
    isBlocked: false,
    createdAt: "2026-06-20",
  },
];

export default function AdminDashboard() {
  const { data: userData } = useGetMe();
  const user = userData?.data;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const [adminsList, setAdminsList] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [createAdminOpen, setCreateAdminOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");

  const toggleBlockAdmin = (id: string) => {
    setAdminsList((prev) =>
      prev.map((adm) => {
        if (adm.id === id) {
          const nextBlocked = !adm.isBlocked;
          toast.add({
            title: nextBlocked ? "Account Blocked" : "Account Unblocked",
            description: `${adm.name} has been ${nextBlocked ? "restricted from access" : "restored"}.`,
            type: "success",
          });
          return { ...adm, isBlocked: nextBlocked };
        }
        return adm;
      })
    );
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName || !newAdminEmail) {
      toast.add({
        title: "Missing Information",
        description: "Please enter both name and email.",
        type: "error",
      });
      return;
    }

    const created: AdminUser = {
      id: `adm-${Date.now().toString().slice(-4)}`,
      name: newAdminName,
      email: newAdminEmail,
      role: newAdminRole,
      isBlocked: false,
      createdAt: "2026-11-17",
    };

    setAdminsList((prev) => [...prev, created]);
    setCreateAdminOpen(false);
    setNewAdminName("");
    setNewAdminEmail("");
    toast.add({
      title: "Administrator Created",
      description: `${created.name} (${created.role}) has been granted administrative permissions.`,
      type: "success",
    });
  };

  return (
    <PageTransition className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border border-teal-500/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="size-3.5 text-teal-400" />
              <span>
                {isSuperAdmin ? "Super Admin Authority Level" : "Administrative Console"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              System Administration
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
              Real-time oversight over certified doctor rosters, patient registrations, clinical appointments, and security compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/approve-doctor">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-md gap-2"
              >
                <ShieldCheck className="size-4" />
                <span>Review Doctor Applications (3)</span>
              </Button>
            </Link>

            {isSuperAdmin && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCreateAdminOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold rounded-xl gap-2 backdrop-blur-md"
              >
                <Plus className="size-4" />
                <span>Create Admin</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Doctors</span>
            <div className="size-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Stethoscope className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">48</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Verified BMDC</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Patients</span>
            <div className="size-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">1,280</span>
            <span className="text-xs text-muted-foreground font-medium">Registered accounts</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Pending Applications</span>
            <div className="size-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">3</span>
            <span className="text-xs text-amber-600 font-medium">Awaiting approval</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Consultations</span>
            <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Video className="size-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">3,450</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">99.8% completion</span>
          </div>
        </div>
      </div>

      {/* Pending Applications Callout */}
      <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              3 Doctor Applications Awaiting Credential Verification
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review submitted medical degrees, BMDC registrations, and experience credentials before approving.
            </p>
          </div>
        </div>

        <Link href="/admin/approve-doctor">
          <Button className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 shadow-sm">
            <span>Open Verification Portal</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </Link>
      </div>

      {/* Super Admin: Admin Accounts Management */}
      {isSuperAdmin && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-5" id="admins">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="warning" className="text-[10px] font-bold">Super Admin Exclusive</Badge>
                <h3 className="text-base font-bold text-foreground">System Administrators & Access Control</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage executive administrative accounts, block/unblock users, and grant Super Admin roles.
              </p>
            </div>

            <Button
              size="sm"
              onClick={() => setCreateAdminOpen(true)}
              className="rounded-xl bg-primary text-primary-foreground font-bold text-xs gap-1.5"
            >
              <Plus className="size-3.5" />
              <span>Add Administrator</span>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/80 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-xs font-bold">Admin Name & Email</TableHead>
                  <TableHead className="text-xs font-bold">Privilege Role</TableHead>
                  <TableHead className="text-xs font-bold">Registered Date</TableHead>
                  <TableHead className="text-xs font-bold">Status</TableHead>
                  <TableHead className="text-xs font-bold text-right">Access Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminsList.map((adm) => (
                  <TableRow key={adm.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <p className="font-bold text-foreground text-xs">{adm.name}</p>
                        <p className="text-[11px] text-muted-foreground">{adm.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {adm.role === "SUPER_ADMIN" ? (
                        <Badge variant="warning" className="text-[10px] font-bold">Super Admin</Badge>
                      ) : (
                        <Badge variant="indigo" className="text-[10px] font-bold">Admin</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{adm.createdAt}</span>
                    </TableCell>
                    <TableCell>
                      {adm.isBlocked ? (
                        <Badge variant="destructive" className="text-[10px] font-bold">Blocked</Badge>
                      ) : (
                        <Badge variant="emerald" className="text-[10px] font-bold">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {adm.email === user?.email ? (
                        <span className="text-[11px] text-muted-foreground font-semibold italic">Current Session</span>
                      ) : (
                        <Button
                          size="sm"
                          variant={adm.isBlocked ? "outline" : "destructive"}
                          onClick={() => toggleBlockAdmin(adm.id)}
                          className="rounded-lg text-xs h-8 gap-1.5 font-bold"
                        >
                          {adm.isBlocked ? (
                            <>
                              <Unlock className="size-3.5" /> Unblock
                            </>
                          ) : (
                            <>
                              <Lock className="size-3.5" /> Block
                            </>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Create Admin Modal */}
      <Dialog open={createAdminOpen} onOpenChange={setCreateAdminOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <KeyRound className="size-5 text-primary" />
              Create Administrator Account
            </DialogTitle>
            <DialogDescription className="text-xs">
              Grant administrative or Super Admin authority to a trusted staff member.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateAdmin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <Input
                type="text"
                placeholder="e.g. Dr. Mahfuzur Rahman"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Official Email</label>
              <Input
                type="email"
                placeholder="e.g. mahfuzur@ph-healthcare.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Role Level</label>
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary"
              >
                <option value="ADMIN">Admin (Clinical & Patient Management)</option>
                <option value="SUPER_ADMIN">Super Admin (Full Governance & Security)</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateAdminOpen(false)}
                className="w-1/2 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-1/2 rounded-xl bg-primary text-primary-foreground font-bold"
              >
                Create Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
