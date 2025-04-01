'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AddRestaurantForm() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/restaurant/create', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })

    setLoading(false)
    setName('')

    if (res.ok) router.refresh()
    else alert('Ошибка при добавлении ресторана')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название ресторана"
        required
        className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 w-full sm:w-auto"
      />
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  )
}
