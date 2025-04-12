'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Dialog } from '@headlessui/react'
import { Plus } from 'lucide-react'
import ImagePicker from './ImagePicker'

export default function AddMenuItemForm({
  menuId,
  onAdd,
}: {
  menuId: string
  onAdd: (item: any) => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('menuId', menuId)


    setLoading(true)
    const res = await fetch('/api/menu-item/create', {
      method: 'POST',
      body: formData,
    })
    setLoading(false)

    if (res.ok) {
      const newItem = await res.json()
      onAdd(newItem)
      setName('')
      setDescription('')
      setPrice('')
      toast.success('Блюдо добавлено!')
      setOpen(false)
    } else {
      toast.error('Ошибка при добавлении блюда')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded font-semibold"
      >
        <Plus className="w-5 h-5" /> Добавить блюдо
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
            <Dialog.Title className="text-lg font-bold text-white mb-4">➕ Новое блюдо</Dialog.Title>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              <input
                type="text"
                required
                name="name"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
              />

              <textarea
                name="description"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
              />

              <input
                required
                type="number"
                step="0.01"
                name="price"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
              />

              <ImagePicker label='Изображение' name='image' />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded font-semibold"
                >
                  {loading ? 'Добавление...' : 'Добавить'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}