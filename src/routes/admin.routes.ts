export const adminRoutes = [
  {
    title: "Executive Management",
    items: [
      {
        title: "Overview",
        url: "/admin",
        icon: "LayoutDashboard",
      },
      {
        title: "Doctor Approvals",
        url: "/admin/approve-doctor",
        icon: "ShieldCheck",
        badge: "Review",
      },
      {
        title: "Doctor Directory",
        url: "/admin#doctors",
        icon: "Stethoscope",
      },
      {
        title: "Patient Registry",
        url: "/admin#patients",
        icon: "Users",
      },
    ],
  },
  {
    title: "Governance & Security",
    items: [
      {
        title: "Admin & Roles",
        url: "/admin#admins",
        icon: "KeyRound",
      },
      {
        title: "Audit & Consultation Logs",
        url: "/admin#audit",
        icon: "FileText",
      },
    ],
  },
];
