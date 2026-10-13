export type OrgTemplateId =
  | "corporate-navy"
  | "executive-gold"
  | "conference-attendee"
  | "visitor-pass"
  | "contractor-access"
  | "campus-id"
  | "healthcare-staff"
  | "event-staff";

export type OrgPassTemplate = {
  id: OrgTemplateId;
  name: string;
  description: string;
  useCase: string;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  paper: string;
  layout: "classic" | "banner" | "sidebar";
};

export const orgTemplates: OrgPassTemplate[] = [
  {
    id: "corporate-navy",
    name: "Corporate Navy",
    description: "A clean, professional employee ID with a navy header and white body.",
    useCase: "Employees",
    label: "EMPLOYEE",
    primary: "#0b2545",
    secondary: "#13315c",
    accent: "#8da9c4",
    text: "#0b2545",
    paper: "#ffffff",
    layout: "classic",
  },
  {
    id: "executive-gold",
    name: "Executive Black & Gold",
    description: "A premium dark badge with gold detailing for leadership and VIP access.",
    useCase: "Executives & VIPs",
    label: "EXECUTIVE",
    primary: "#111111",
    secondary: "#1f1f1f",
    accent: "#c9a227",
    text: "#f5f0dc",
    paper: "#181818",
    layout: "banner",
  },
  {
    id: "conference-attendee",
    name: "Conference Attendee",
    description: "A bold name-forward badge that is easy to read across a room.",
    useCase: "Conferences & summits",
    label: "ATTENDEE",
    primary: "#1d4ed8",
    secondary: "#1e3a8a",
    accent: "#38bdf8",
    text: "#0f172a",
    paper: "#f8fafc",
    layout: "banner",
  },
  {
    id: "visitor-pass",
    name: "Visitor Pass",
    description: "A high-visibility temporary pass with host and valid-until fields.",
    useCase: "Guests & visitors",
    label: "VISITOR",
    primary: "#b45309",
    secondary: "#92400e",
    accent: "#fbbf24",
    text: "#1c1917",
    paper: "#fffbeb",
    layout: "sidebar",
  },
  {
    id: "contractor-access",
    name: "Contractor Access",
    description: "A restricted-access badge with a clear contractor band and company field.",
    useCase: "Contractors & vendors",
    label: "CONTRACTOR",
    primary: "#374151",
    secondary: "#1f2937",
    accent: "#f97316",
    text: "#111827",
    paper: "#f3f4f6",
    layout: "sidebar",
  },
  {
    id: "campus-id",
    name: "Campus ID",
    description: "A traditional institutional ID in deep green for students and faculty.",
    useCase: "Schools & universities",
    label: "STUDENT / FACULTY",
    primary: "#14532d",
    secondary: "#166534",
    accent: "#86efac",
    text: "#052e16",
    paper: "#f0fdf4",
    layout: "classic",
  },
  {
    id: "healthcare-staff",
    name: "Healthcare Staff",
    description: "A calm, legible badge with department and clearance fields.",
    useCase: "Hospitals & clinics",
    label: "STAFF",
    primary: "#0f766e",
    secondary: "#115e59",
    accent: "#5eead4",
    text: "#134e4a",
    paper: "#f0fdfa",
    layout: "classic",
  },
  {
    id: "event-staff",
    name: "Event Staff",
    description: "A crisp maroon crew badge for organizers, volunteers, and security.",
    useCase: "Events & volunteers",
    label: "STAFF",
    primary: "#7f1d1d",
    secondary: "#991b1b",
    accent: "#fca5a5",
    text: "#450a0a",
    paper: "#fef2f2",
    layout: "banner",
  },
];
