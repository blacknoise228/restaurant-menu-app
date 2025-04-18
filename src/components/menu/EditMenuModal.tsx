'use client'

import { useState } from 'react'

interface EditMenuModalProps {
  menu: {
    id: string
    title: string
  }
  onClose: () => void
  onUpdated: () => void
}

export default function EditMenuModal({ menu, onClose, onUpdated }: EditMenuModalProps) {
  const [title, setTitle] = useState(menu.title)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const res = await fetch(`/api/menus/${menu.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })

    if (res.ok) {
      onUpdated()
      onClose()
    } else {
      alert('Ошибка обновления меню')
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Фоновый оверлей на весь экран с блюром */}
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"></div>

      {/* Модальное окно, стилизованное под общий стиль */}
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg text-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Редактировать меню</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Название меню
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md"
            >
              {saving ? 'Сохраняется...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
