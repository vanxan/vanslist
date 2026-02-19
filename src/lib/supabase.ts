import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Trade {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
  priority_tier: number;
  is_active: boolean;
  seo_title: string;
  seo_description: string;
}

export interface Task {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface ContentType {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  trade_id: string;
  task_id: string;
  content_type_id: string;
  summary: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'needs-tech-person';
  llm_compatibility: string[];
  cost_display: string | null;
  cost_monthly: number | null;
  pros: string[] | null;
  cons: string[] | null;
  the_catch: string | null;
  external_url: string | null;
  prompt_text: string | null;
  steps: { step: number; title: string; description: string; tool: string }[] | null;
  is_stack: boolean;
  stack_listing_ids: string[];
  stack_total_monthly: number | null;
  is_verified: boolean;
  last_verified_at: string | null;
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  trade?: Trade;
  task?: Task;
  content_type?: ContentType;
}
