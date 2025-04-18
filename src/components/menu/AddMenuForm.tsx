'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddMenuForm({ restaurantId }: { restaurantId: string }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/menu/create', {
      method: 'POST',
      body: JSON.stringify({ title, restaurantId }),
      headers: { 'Content-Type': 'application/json' },
    })

    setLoading(false)

    if (res.ok) {
      setTitle('')
      router.refresh()
    } else {
      alert('Ошибка при создании меню')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label className="block mb-2 text-sm font-medium">Название меню</label>
      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Например: Завтрак"
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-3 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded font-semibold"
      >
        {loading ? 'Добавление...' : 'Добавить меню'}
      </button>
    </form>
  )
}
