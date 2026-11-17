"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Badge } from "@/components/ui/badge";

export default function DoctorApprovalTabs() {
  return (
    <Tabs defaultValue="pending" className="space-y-6">
      <TabsList className="bg-muted/60 p-1 rounded-2xl border border-border">
        <TabsTrigger
          value="pending"
          className="rounded-xl text-xs font-bold gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <span>Pending Applications</span>
          <span className="size-5 rounded-full bg-amber-500/20 text-amber-600 text-[10px] flex items-center justify-center font-black">
            3
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="approved"
          className="rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Approved Doctors
        </TabsTrigger>
        <TabsTrigger
          value="rejected"
          className="rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Rejected
        </TabsTrigger>
        <TabsTrigger
          value="all"
          className="rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          All Applications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pending">
        <DoctorApprovalTable statusFilter="pending" />
      </TabsContent>
      <TabsContent value="approved">
        <DoctorApprovalTable statusFilter="approved" />
      </TabsContent>
      <TabsContent value="rejected">
        <DoctorApprovalTable statusFilter="rejected" />
      </TabsContent>
      <TabsContent value="all">
        <DoctorApprovalTable statusFilter="all" />
      </TabsContent>
    </Tabs>
  );
}
