export interface Trade {
  name: string;
  icon: string;
  category: string;
  count: number;
  slug: string;
  soon?: boolean;
}

export const TRADES: Trade[] = [
  { name: "Plumber", icon: "Wrench", category: "Home Services", count: 14, slug: "plumber" },
  { name: "Electrician", icon: "Lightning", category: "Home Services", count: 0, slug: "electrician", soon: true },
  { name: "HVAC Tech", icon: "ThermometerCold", category: "Home Services", count: 0, slug: "hvac", soon: true },
  { name: "Landscaper", icon: "Tree", category: "Home Services", count: 0, slug: "landscaper", soon: true },
  { name: "Roofer", icon: "HouseSimple", category: "Home Services", count: 0, slug: "roofer", soon: true },
  { name: "Painter", icon: "PaintRoller", category: "Home Services", count: 0, slug: "painter", soon: true },
  { name: "Carpet Cleaner", icon: "Broom", category: "Home Services", count: 0, slug: "carpet-cleaner", soon: true },
  { name: "Locksmith", icon: "Key", category: "Home Services", count: 0, slug: "locksmith", soon: true },
  { name: "Therapist", icon: "Brain", category: "Health & Wellness", count: 0, slug: "therapist", soon: true },
  { name: "Chiropractor", icon: "PersonArmsSpread", category: "Health & Wellness", count: 0, slug: "chiropractor", soon: true },
  { name: "Personal Trainer", icon: "Barbell", category: "Health & Wellness", count: 0, slug: "personal-trainer", soon: true },
  { name: "Dentist", icon: "Tooth", category: "Health & Wellness", count: 0, slug: "dentist", soon: true },
  { name: "Wedding Photographer", icon: "Camera", category: "Creative & Media", count: 0, slug: "wedding-photographer", soon: true },
  { name: "Videographer", icon: "VideoCamera", category: "Creative & Media", count: 0, slug: "videographer", soon: true },
  { name: "Graphic Designer", icon: "Palette", category: "Creative & Media", count: 0, slug: "graphic-designer", soon: true },
  { name: "Real Estate Agent", icon: "HouseLine", category: "Professional Services", count: 0, slug: "real-estate", soon: true },
  { name: "Insurance Agent", icon: "ShieldCheck", category: "Professional Services", count: 0, slug: "insurance", soon: true },
  { name: "Accountant", icon: "Calculator", category: "Professional Services", count: 0, slug: "accountant", soon: true },
  { name: "Attorney", icon: "Scales", category: "Professional Services", count: 0, slug: "attorney", soon: true },
  { name: "Financial Advisor", icon: "ChartLineUp", category: "Professional Services", count: 0, slug: "financial-advisor", soon: true },
  { name: "Restaurant Owner", icon: "CookingPot", category: "Food & Beverage", count: 0, slug: "restaurant", soon: true },
  { name: "Caterer", icon: "ForkKnife", category: "Food & Beverage", count: 0, slug: "caterer", soon: true },
  { name: "Baker", icon: "Cake", category: "Food & Beverage", count: 0, slug: "baker", soon: true },
  { name: "Auto Body / PDR", icon: "Car", category: "Auto Services", count: 0, slug: "auto-body", soon: true },
  { name: "Mechanic", icon: "Engine", category: "Auto Services", count: 0, slug: "mechanic", soon: true },
  { name: "Auto Detailer", icon: "DropHalfBottom", category: "Auto Services", count: 0, slug: "auto-detailer", soon: true },
  { name: "Dog Walker", icon: "Dog", category: "Pet Services", count: 0, slug: "dog-walker", soon: true },
  { name: "Pet Groomer", icon: "Scissors", category: "Pet Services", count: 0, slug: "pet-groomer", soon: true },
  { name: "Tutor", icon: "GraduationCap", category: "Education", count: 0, slug: "tutor", soon: true },
  { name: "Music Teacher", icon: "MusicNote", category: "Education", count: 0, slug: "music-teacher", soon: true },
];

export const CATEGORIES = ["All", "Home Services", "Health & Wellness", "Creative & Media", "Professional Services", "Food & Beverage", "Auto Services", "Pet Services", "Education"];

export const CONTENT_TYPES = [
  { label: "All", icon: "SquaresFour" },
  { label: "Apps", icon: "AppWindow" },
  { label: "Prompts", icon: "ChatText" },
  { label: "Skills", icon: "Brain" },
  { label: "Workflows", icon: "ArrowsClockwise" },
  { label: "Bundles", icon: "Package" },
  { label: "Services", icon: "Handshake" },
];

export const TASK_TAGS = ["Scheduling", "Invoicing", "Lead Generation", "Marketing", "Customer Service", "Estimating", "Dispatch", "Admin", "Accounting", "Training", "Hiring", "Analytics", "Communication"];

export const FEATURE_TAGS = ["AI-Powered", "Free Trial", "Mobile App", "Integrations", "Automation", "Templates", "No-Code", "Open Source", "API Access", "Multi-Language"];
