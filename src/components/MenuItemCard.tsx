'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      {item.image_url && !isEditing && (
        <Image
          src={item.image_url}
          alt={item.name}
          width={300}
          height={200}
          className="w-full max-h-60 object-cover rounded mb-3"
        />
      )}

      {isEditing ? (
        <>
          <input
            className="w-full mb-2 p-2 bg-gray-800 text-white border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-2 bg-gray-800 text-white border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 bg-gray-800 text-white border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
          />
          <input
            className="text-white mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-1 rounded"
            >
              Сохранить
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-white"
            >
              Отмена
            </button>
          </div>
        </>
      ) : (
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
      )}
    </div>
  )
}
