export const patientRoutes = [
  {
    title: "Patient Portal",
    items: [
      {
        title: "Overview",
        url: "/patient",
        icon: "LayoutDashboard",
      },
      {
        title: "Upcoming Consultations",
        url: "/patient#upcoming",
        icon: "Calendar",
      },
      {
        title: "Consultation History",
        url: "/patient#history",
        icon: "Clock",
      },
      {
        title: "My Prescriptions",
        url: "/patient#prescriptions",
        icon: "FileCheck2",
      },
    ],
  },
  {
    title: "Healthcare Services",
    items: [
      {
        title: "Find a Doctor",
        url: "/doctors",
        icon: "Stethoscope",
      },
      {
        title: "Invoices & Payments",
        url: "/patient#payments",
        icon: "Receipt",
      },
    ],
  },
];
