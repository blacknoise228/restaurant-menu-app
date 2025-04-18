'use client'

import { useState } from 'react'
import Image from 'next/image'
import Portal from '../Portal'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  menu_id: string
  created_at: string
}

interface Props {
  item: MenuItem
  onDelete?: (id: string) => void
  onUpdate?: (item: MenuItem) => void
}

function isInvalid(text: string) {
  return !text || text.trim() === ""
}

export default function MenuItemCard({ item, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [price, setPrice] = useState(item.price.toString())
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Удалить блюдо?')) return
    setLoading(true)
    const res = await fetch('/api/menu-item/delete', {
      method: 'POST',
      body: JSON.stringify({ id: item.id }),
      headers: { 'Content-Type': 'application/json' },
    })
    setLoading(false)
    if (res.ok) {
      onDelete?.(item.id)
    } else {
      alert('Ошибка при удалении')
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('id', item.id)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    if (image) formData.append('image', image)

    if (isInvalid(name) || isInvalid(description) || isInvalid(price)) {
      throw new Error('Заполните все поля')
      return
    }

    if (!image) {
      throw new Error('Выберите изображение')
      return
    }

    setLoading(true)
    const res = await fetch('/api/menu-item/update', {
      method: 'POST',
      body: formData,
    })
    setLoading(false)

    if (res.ok) {
      let updated: MenuItem = {
        ...item, // сохраняем menu_id и created_at!
        name,
        description,
        price: parseFloat(price),
      }

      try {
        const json = await res.json()
        if (json.image_url) {
          updated.image_url = json.image_url
        }
      } catch (e) {
        console.warn('Ошибка получения image_url')
      }

      onUpdate?.(updated)
      setIsEditing(false)
      setImage(null)
    } else {
      alert('Ошибка при обновлении')
    }
  }

  return (
    <div className="border border-gray-700 rounded p-4 relative bg-gray-900">
      {item.image_url && (
        <Image
          src={item.image_url}
          alt={item.name}
          width={300}
          height={200}
          className="w-full max-h-60 object-cover rounded mb-3 aspect-square"
        />
      )}
      <>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.description}</p>
        <p className="text-teal-400 font-bold mt-1">{item.price} тг</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:underline"
          >
            Изменить
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:underline"
          >
            Удалить
          </button>
        </div>
      </>
      {isEditing && (
        <>
          <Portal>
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-8">
              <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                <div className="flex flex-col items-center justify-center items-center gap-3 text-teal-400 mb-6 px-2">
                  <input
                    className="w-full mb-2 p-2 bg-gray-800 text-white border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <textarea
                    className="w-full mb-2 p-2 bg-gray-800 text-white border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <input
                    className="w-full mb-2 p-2 bg-gray-800 text-white border rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    step="0.01"
                    required
                  />
                  <div className="mb-3">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded text-sm"
                    >
                      Загрузить изображение
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                  </div>
                  <div className="flex flex-row gap-10 mt-2">
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-1 rounded"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-100 hover:bg-gray-400 border border-gray-400 px-4 py-1 rounded"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Portal>
        </>
      )}
    </div>
  )
}
