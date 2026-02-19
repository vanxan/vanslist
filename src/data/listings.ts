export interface Listing {
  title: string;
  type: string;
  typeIcon: string;
  task: string;
  taskIcon: string;
  summary: string;
  description?: string;
  votes: number;
  difficulty: string;
  slug: string;
  url?: string;
  cost?: string;
  tags?: string[];
  verified?: boolean;
  trustScore?: { passed: number; total: number };
  pros?: string[];
  cons?: string[];
  theCatch?: string;
}

export const LISTINGS: Listing[] = [
  {
    title: "The Solo Plumber AI Stack", type: "Bundle", typeIcon: "Package", task: "Admin & Invoicing", taskIcon: "ClipboardText",
    summary: "Complete AI toolkit for a one-person plumbing operation. 4 tools, $154/mo, replaces ~10 hours/week of admin.",
    votes: 847, difficulty: "Easy", slug: "solo-plumber-ai-stack"
  },
  {
    title: "Jobber AI", type: "App", typeIcon: "AppWindow", task: "Scheduling", taskIcon: "CalendarDots",
    summary: "All-in-one scheduling, quoting, and dispatch for small plumbing teams.",
    description: "Jobber is a field service management platform with AI features for scheduling, route optimization, and automated dispatch. It handles online booking, invoicing, and client communication in one place. Best for solo plumbers or small teams (1-5 people) who want to stop juggling spreadsheets and phone calls.",
    votes: 623, difficulty: "Easy", slug: "jobber-ai", url: "https://getjobber.com", cost: "From $39/mo",
    tags: ["Home Services", "Scheduling", "Field Service"],
    verified: true, trustScore: { passed: 17, total: 18 },
    pros: ["Dead simple to learn — most plumbers are up and running in a day", "AI route optimization saves 30-60 min of windshield time daily", "Online booking page you can link from Google Business", "Invoice on the spot from your phone as you finish a job"],
    cons: ["Gets pricey once you add team members ($39/mo is solo only)", "AI features are still basic — don't expect ChatGPT-level smarts", "Reporting is surface-level compared to ServiceTitan"],
    theCatch: "The $39/mo Core plan is limited to basic scheduling. Most plumbers end up on the $119/mo Connect plan for the features they actually need. AI dispatching is only on the top-tier Grow plan at $249/mo."
  },
  {
    title: "Follow-Up Text After Sending a Quote", type: "Prompt", typeIcon: "ChatText", task: "Lead Generation", taskIcon: "Target",
    summary: "Get a friendly follow-up text when a customer ghosts your quote.",
    votes: 534, difficulty: "Easy", slug: "follow-up-text-quote"
  },
  {
    title: "ServiceTitan", type: "App", typeIcon: "AppWindow", task: "Scheduling", taskIcon: "CalendarDots",
    summary: "Enterprise-grade field service management with AI dispatching and reporting.",
    votes: 412, difficulty: "Medium", slug: "servicetitan", url: "https://servicetitan.com", cost: "Custom pricing"
  },
  {
    title: "Quote-to-Close Follow-Up Workflow", type: "Workflow", typeIcon: "ArrowsClockwise", task: "Lead Generation", taskIcon: "Target",
    summary: "Automated 3-step follow-up sequence that turns sent quotes into booked jobs.",
    votes: 312, difficulty: "Medium", slug: "quote-to-close-workflow"
  },
  {
    title: "Housecall Pro", type: "App", typeIcon: "AppWindow", task: "Scheduling", taskIcon: "CalendarDots",
    summary: "Scheduling, invoicing, and online booking with a clean mobile app.",
    votes: 389, difficulty: "Easy", slug: "housecall-pro", url: "https://housecallpro.com", cost: "From $49/mo"
  },
  {
    title: "Emergency Diagnostic Prompt", type: "Prompt", typeIcon: "ChatText", task: "Customer Service", taskIcon: "Phone",
    summary: "Walk a homeowner through basic pipe diagnostics before you roll a truck.",
    votes: 456, difficulty: "Easy", slug: "emergency-diagnostic-prompt"
  },
  {
    title: "Flat Rate Pricing Prompt", type: "Prompt", typeIcon: "ChatText", task: "Estimating", taskIcon: "CurrencyDollar",
    summary: "Generate flat-rate pricing for common plumbing jobs based on your local market.",
    votes: 401, difficulty: "Easy", slug: "flat-rate-pricing-prompt"
  },
  {
    title: "Google Business Optimizer", type: "Prompt", typeIcon: "ChatText", task: "Marketing", taskIcon: "Megaphone",
    summary: "Get AI-written Google Business descriptions that actually rank for local plumbing searches.",
    votes: 378, difficulty: "Easy", slug: "google-business-optimizer"
  },
  {
    title: "FieldPulse", type: "App", typeIcon: "AppWindow", task: "Scheduling", taskIcon: "CalendarDots",
    summary: "Simple job management with estimates, invoicing, and GPS tracking for small teams.",
    votes: 267, difficulty: "Easy", slug: "fieldpulse", url: "https://fieldpulse.com", cost: "From $60/mo"
  },
  {
    title: "Weekly Content Calendar Prompt", type: "Prompt", typeIcon: "ChatText", task: "Marketing", taskIcon: "Megaphone",
    summary: "AI builds a full week of social media posts for your plumbing business.",
    votes: 345, difficulty: "Easy", slug: "weekly-content-calendar"
  },
  {
    title: "Auto Google Review Requests", type: "Workflow", typeIcon: "Lightning", task: "Marketing", taskIcon: "Megaphone",
    summary: "Set-and-forget system that texts customers a review link 2 hours after every job.",
    votes: 289, difficulty: "Easy", slug: "auto-google-review-requests"
  },
  {
    title: "Plumbing Estimator AI", type: "Skill", typeIcon: "Brain", task: "Estimating", taskIcon: "CurrencyDollar",
    summary: "System prompt that turns any LLM into a plumbing cost estimator. Knows standard rates, materials, and labor times.",
    votes: 312, difficulty: "Easy", slug: "plumbing-estimator-ai"
  },
  {
    title: "Service Call Triage Agent", type: "Skill", typeIcon: "Brain", task: "Customer Service", taskIcon: "Phone",
    summary: "AI persona that handles inbound service calls, qualifies urgency, and books the right appointment slot.",
    votes: 245, difficulty: "Medium", slug: "service-call-triage-agent"
  },
];
