import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const newImage = formData.get('image') as File | null

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let image_url: string | undefined = undefined

  if (newImage && newImage.size > 0) {
    const buffer = Buffer.from(await newImage.arrayBuffer())
    const filename = `item_${randomUUID()}.${newImage.type.split('/')[1]}`

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(filename, buffer, {
        contentType: newImage.type,
      })

    if (uploadError) {
      console.error('Ошибка загрузки нового изображения:', uploadError)
      return NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
    }

    image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-images/${filename}`
  }

  const updateFields: any = {
    name,
    description,
    price,
  }

  if (image_url) updateFields.image_url = image_url

  const { error } = await supabase.from('menu_items').update(updateFields).eq('id', id)

  if (error) {
    console.error('Ошибка обновления:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
