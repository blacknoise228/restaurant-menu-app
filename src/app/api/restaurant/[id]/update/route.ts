// src/app/api/restaurant/[id]/update/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { id } = params
  const body = await req.json()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, logo_url } = body

  const { error } = await supabase
    .from('restaurants')
    .update({ name, logo_url })
    .eq('id', id)
    .eq('user_id', session.user.id)

  if (error) {
    console.error('Ошибка обновления ресторана:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
