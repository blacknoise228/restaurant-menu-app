import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const menuId = formData.get('menuId') as string
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const imageFile = formData.get('image') as File

    console.log('Запрос добавления блюда:', { menuId, name, description, price })
    console.log('Файл изображения:', imageFile)

    if (!menuId || !name || !price || !imageFile) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Проверяем, что меню принадлежит пользователю
    const { data: menu, error: menuError } = await supabase
      .from('menus')
      .select('id, restaurant_id')
      .eq('id', menuId)
      .maybeSingle()

    if (!menu || menuError) {
      console.error('Меню не найдено или ошибка запроса:', menuError)
      return NextResponse.json({ error: 'Меню не найдено' }, { status: 404 })
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('user_id')
      .eq('id', menu.restaurant_id)
      .maybeSingle()

    if (restaurant?.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Вы не владелец ресторана' }, { status: 403 })
    }

    // Загружаем изображение
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const filename = `item_${randomUUID()}.${imageFile.type.split('/')[1]}`

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(filename, buffer, {
        contentType: imageFile.type,
      })

    if (uploadError) {
      console.error('Ошибка загрузки изображения:', uploadError)
      return NextResponse.json({ error: 'Ошибка загрузки изображения' }, { status: 500 })
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-images/${filename}`

    // Вставляем блюдо
    const { data, error: insertError } = await supabase
    .from('menu_items')
    .insert({ menu_id: menuId, name, description, price, image_url: imageUrl })
    .select()
    .single()
  
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }
  
  return NextResponse.json(data) // ⬅️ вернём блюдо
  
  } catch (e) {
    console.error('Неизвестная ошибка в API /menu-item/create:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
