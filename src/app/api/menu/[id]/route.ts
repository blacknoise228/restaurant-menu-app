import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('menus')
    .select('id, title, restaurant_id')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Menu not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

