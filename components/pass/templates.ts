export type PassTemplateId =
  | "design-1"
  | "design-2"
  | "design-3"
  | "design-4"
  | "design-5"
  | "design-6";

export type PassTemplate = {
  id: PassTemplateId;
  name: string;
  description: string;
  accent: string;
  sheet: "one" | "two";
  position: string;
  photoPosition: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

export const passTemplates: PassTemplate[] = [
  {
    id: "design-1",
    name: "Sunburst Pop",
    description: "A bright radial design with comic-style stars and lightning.",
    accent: "#ffcc00",
    sheet: "one",
    position: "0% 0%",
    photoPosition: { left: "24%", top: "22%", width: "52%", height: "35%" },
  },
  {
    id: "design-2",
    name: "Crown Mosaic",
    description: "A geometric color-block design with a bold crown accent.",
    accent: "#00c7b7",
    sheet: "one",
    position: "50% 0%",
    photoPosition: { left: "24%", top: "22%", width: "52%", height: "35%" },
  },
  {
    id: "design-3",
    name: "Neon Cosmic",
    description: "A futuristic neon design with cosmic and music-inspired details.",
    accent: "#a46bff",
    sheet: "one",
    position: "100% 0%",
    photoPosition: { left: "24%", top: "22%", width: "52%", height: "35%" },
  },
  {
    id: "design-4",
    name: "Pop Art Burst",
    description: "A playful comic-inspired design with colorful expressive details.",
    accent: "#ff2d78",
    sheet: "one",
    position: "0% 100%",
    photoPosition: { left: "24%", top: "26%", width: "52%", height: "36%" },
  },
  {
    id: "design-5",
    name: "Tech Circuit",
    description: "A detailed dark pattern design with bright mechanical accents.",
    accent: "#00d4c7",
    sheet: "one",
    position: "50% 100%",
    photoPosition: { left: "24%", top: "26%", width: "52%", height: "36%" },
  },
  {
    id: "design-6",
    name: "Vinyl Grid",
    description: "A retro music-inspired design with a colorful record grid.",
    accent: "#ff3b30",
    sheet: "one",
    position: "100% 100%",
    photoPosition: { left: "24%", top: "26%", width: "52%", height: "36%" },
  },
];
