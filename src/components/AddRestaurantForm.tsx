'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { FaUtensils } from 'react-icons/fa'

export function AddRestaurantForm() {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
  
    let logo_url = null
  
    try {
      if (logo) {
        const fileExt = logo.name.split('.').pop() || 'png'
        const fileName = `${Date.now()}.${fileExt}`
  
        const { data, error } = await supabase.storage
          .from('logos')
          .upload(fileName, logo)
  
        if (error) throw error
  
        const { data: publicUrl } = supabase
          .storage
          .from('logos')
          .getPublicUrl(data.path)
  
        logo_url = publicUrl.publicUrl
      }
  
      const res = await fetch('/api/restaurant/create', {
        method: 'POST',
        body: JSON.stringify({ name, logo_url }),
      })
  
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Ошибка при добавлении ресторана')
      }
  
      router.refresh()
      setName('')
      setLogo(null)
    } catch (error: any) {
      console.error('Ошибка:', error.message)
      alert(error.message || 'Что-то пошло не так')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8 space-y-6">
      <div className="flex items-center gap-3 text-teal-400">
        <FaUtensils className="text-2xl" />
        <h2 className="text-2xl font-extrabold text-white">Добавить ресторан</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
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
          {loading ? 'Добавление...' : 'Добавить ресторан'}
        </button>
      </form>
    </div>
  )
}
