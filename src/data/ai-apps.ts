export interface AIApp {
  name: string;
  icon: string;
  category: string;
  tagline: string;
  commission: string;
  url: string;
  featured?: boolean;
}

export const AI_APPS: AIApp[] = [
  { name: "Jasper", icon: "PenNib", category: "Writing", tagline: "AI content creation for marketing teams", commission: "30% lifetime recurring", url: "https://jasper.ai", featured: true },
  { name: "Canva", icon: "PaintBrushBroad", category: "Design", tagline: "AI-powered design tool for everything visual", commission: "Up to 20%", url: "https://canva.com", featured: true },
  { name: "Writesonic", icon: "Article", category: "Writing", tagline: "SEO-friendly content at scale with AI", commission: "30% lifetime recurring", url: "https://writesonic.com" },
  { name: "HubSpot", icon: "ChartLineUp", category: "Marketing", tagline: "CRM, marketing, and sales — all AI-powered", commission: "30% recurring (yr 1)", url: "https://hubspot.com", featured: true },
  { name: "Semrush", icon: "MagnifyingGlassPlus", category: "SEO", tagline: "AI-driven SEO, content, and competitor research", commission: "$200 per sale", url: "https://semrush.com" },
  { name: "GetResponse", icon: "EnvelopeSimple", category: "Email", tagline: "Email marketing and automation with AI builder", commission: "Up to 50%", url: "https://getresponse.com" },
  { name: "Wix", icon: "Browser", category: "Website", tagline: "AI website builder for any business", commission: "100% mo 1, 30% ongoing", url: "https://wix.com" },
  { name: "Pictory", icon: "VideoCamera", category: "Video", tagline: "Turn scripts and blogs into scroll-stopping videos", commission: "30% recurring", url: "https://pictory.ai" },
  { name: "AdCreative AI", icon: "ImageSquare", category: "Ads", tagline: "AI-generated ad creatives that convert", commission: "22.5% recurring + bonus", url: "https://adcreative.ai", featured: true },
  { name: "Synthesia", icon: "UserRectangle", category: "Video", tagline: "AI videos with realistic avatars in any language", commission: "20% for 12 months", url: "https://synthesia.io" },
  { name: "Copy.ai", icon: "CursorText", category: "Writing", tagline: "AI copywriting for ads, emails, and social posts", commission: "20% recurring", url: "https://copy.ai" },
  { name: "10Web", icon: "Layout", category: "Website", tagline: "AI WordPress builder with hosting and optimization", commission: "Up to 30%", url: "https://10web.io" },
  { name: "Koala AI", icon: "PencilLine", category: "Writing", tagline: "AI writer trained for SEO blog content", commission: "30% lifetime recurring", url: "https://koala.sh" },
  { name: "HeadshotPro", icon: "UserCircle", category: "Photography", tagline: "AI professional headshots from selfies", commission: "30%", url: "https://headshotpro.com" },
  { name: "PhotoAI", icon: "CameraPlus", category: "Photography", tagline: "Generate stunning AI photos from your uploads", commission: "20%", url: "https://photoai.com" },
  { name: "CustomGPT", icon: "Robot", category: "Chatbot", tagline: "Build custom AI chatbots for your business", commission: "20% for 2 years", url: "https://customgpt.ai" },
  { name: "Fireflies", icon: "Microphone", category: "Productivity", tagline: "AI meeting notes and transcription", commission: "20% recurring", url: "https://fireflies.ai" },
  { name: "NiceJob", icon: "Star", category: "Reviews", tagline: "Automated review collection on autopilot", commission: "Partner program", url: "https://nicejob.com" },
];

export const AI_APP_CATEGORIES = ["All", "Writing", "Design", "Marketing", "SEO", "Email", "Video", "Website", "Ads", "Productivity", "Photography", "Chatbot", "Reviews"];
