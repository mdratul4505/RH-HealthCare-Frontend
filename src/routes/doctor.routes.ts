export const doctorRoutes = [
  {
    title: "Clinical Practice",
    items: [
      {
        title: "Clinical Overview",
        url: "/doctor",
        icon: "LayoutDashboard",
      },
      {
        title: "Today's Queue",
        url: "/doctor#today",
        icon: "Video",
        badge: "Live",
      },
      {
        title: "Publish Schedule Slots",
        url: "/doctor#schedules",
        icon: "Calendar",
      },
      {
        title: "Patient Consultations",
        url: "/doctor#patients",
        icon: "Users",
      },
    ],
  },
  {
    title: "Prescriptions & Earnings",
    items: [
      {
        title: "Digital Prescriptions",
        url: "/doctor#prescriptions",
        icon: "FileCheck2",
      },
      {
        title: "Revenue & Earnings",
        url: "/doctor#earnings",
        icon: "Banknote",
      },
    ],
  },
];
