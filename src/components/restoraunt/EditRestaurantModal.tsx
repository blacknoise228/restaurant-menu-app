'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FaUtensils } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

interface Restaurant {
  id: string
  name: string
  logo_url: string | null
}

export default function EditRestaurantModal({ restaurantId, isOpen, onClose }: { restaurantId: string, isOpen: boolean, onClose: () => void }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Загрузка данных ресторана
  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single()

      if (error) {
        console.error('Error fetching restaurant:', error.message)
        return
      }

      setRestaurant(data)
      setName(data.name)
    }

    if (isOpen) {
      fetchRestaurant()
    }
  }, [restaurantId, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let logo_url = restaurant?.logo_url

    // Загружаем новый логотип, если выбран
    if (logo) {
      const fileExt = logo.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('logos')
        .upload(fileName, logo)

      if (!error && data) {
        const { data: publicUrl } = supabase
          .storage
          .from('logos')
          .getPublicUrl(data.path)
        logo_url = publicUrl.publicUrl
      }
    }

    // Обновляем данные ресторана
    const res = await fetch(`/api/restaurant/${restaurant?.id}/update`, {
      method: 'POST',
      body: JSON.stringify({ name, logo_url }),
    })

    setLoading(false)

    if (res.ok) {
      toast.success('Ресторан успешно обновлен')
      onClose()
    } else {
      toast.error('Ошибка при редактировании ресторана')
    }
  }

  if (!isOpen || !restaurant) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 text-teal-400 mb-6">
          <FaUtensils className="text-2xl" />
          <h2 className="text-2xl font-extrabold">Редактировать ресторан</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-300 font-medium">Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Pizza House"
              required
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 font-medium">Логотип ресторана</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              className="w-full text-gray-300 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 file:cursor-pointer file:text-white file:bg-teal-600 hover:file:bg-teal-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Сохраняем...' : 'Сохранить изменения'}
          </button>
        </form>
      </div>
    </div>
  )
}
