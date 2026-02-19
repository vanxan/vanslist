import { supabase, Trade, Task, ContentType, Listing } from './supabase';

export async function getTrades(): Promise<Trade[]> {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .eq('is_active', true)
    .order('name');
  if (error) throw error;
  return data || [];
}

export async function getTradeBySlug(slug: string): Promise<Trade | null> {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) return null;
  return data;
}

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('sort_order');
  if (error) throw error;
  return data || [];
}

export async function getContentTypes(): Promise<ContentType[]> {
  const { data, error } = await supabase
    .from('content_types')
    .select('*')
    .order('sort_order');
  if (error) throw error;
  return data || [];
}

export async function getListingsForTrade(
  tradeId: string,
  filters?: {
    contentTypeSlug?: string;
    taskSlug?: string;
    difficulty?: string;
  }
): Promise<(Listing & { task: Task; content_type: ContentType })[]> {
  let query = supabase
    .from('listings')
    .select(`
      *,
      task:tasks(*),
      content_type:content_types(*)
    `)
    .eq('trade_id', tradeId)
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;

  let results = data || [];

  // Client-side filtering for joined fields
  if (filters?.contentTypeSlug) {
    results = results.filter((l: any) => l.content_type?.slug === filters.contentTypeSlug);
  }
  if (filters?.taskSlug) {
    results = results.filter((l: any) => l.task?.slug === filters.taskSlug);
  }
  if (filters?.difficulty) {
    results = results.filter((l: any) => l.difficulty === filters.difficulty);
  }

  return results as any;
}

export async function getListingBySlug(
  tradeSlug: string,
  listingSlug: string
): Promise<(Listing & { trade: Trade; task: Task; content_type: ContentType }) | null> {
  // First get the trade
  const trade = await getTradeBySlug(tradeSlug);
  if (!trade) return null;

  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      trade:trades(*),
      task:tasks(*),
      content_type:content_types(*)
    `)
    .eq('trade_id', trade.id)
    .eq('slug', listingSlug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data as any;
}
