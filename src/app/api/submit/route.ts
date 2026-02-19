import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const { error } = await supabase.from('submissions').insert({
      tool_name: formData.get('tool_name') as string,
      tool_url: formData.get('tool_url') as string || null,
      description: formData.get('description') as string,
      trades: (formData.get('trades') as string)?.split(',').map((t) => t.trim()).filter(Boolean) || [],
      pricing: formData.get('pricing') as string || null,
      submitter_name: formData.get('submitter_name') as string || null,
      submitter_email: formData.get('submitter_email') as string || null,
    });

    if (error) throw error;

    // Redirect back with success
    return NextResponse.redirect(new URL('/submit?success=1', request.url));
  } catch (err) {
    return NextResponse.redirect(new URL('/submit?error=1', request.url));
  }
}
