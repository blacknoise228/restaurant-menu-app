import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'No ID' }, { status: 400 })

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // получаем блюдо и ссылку на изображение
  const { data: item } = await supabase
    .from('menu_items')
    .select('image_url')
    .eq('id', id)
    .maybeSingle()

  // удаляем изображение из Supabase Storage
  if (item?.image_url) {
    const path = item.image_url.split('/menu-images/')[1]
    if (path) {
      await supabase.storage.from('menu-images').remove([path])
    }
  }

  // удаляем блюдо из базы
  const { error } = await supabase.from('menu_items').delete().eq('id', id)

  if (error) {
    console.error('Ошибка при удалении:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
