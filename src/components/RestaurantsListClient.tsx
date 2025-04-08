'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import EditRestaurantModal from './EditRestaurantModal'
import { useRouter } from 'next/navigation'

interface Restaurant {
  id: string
  name: string
  logo_url: string | null
}

export default function RestaurantsListClient({ restaurants }: { restaurants: Restaurant[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleEdit = (id: string) => {
    setSelectedId(id)
    setIsEditOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить меню?')) {
      setDeleting(true)
      const res = await fetch(`/api/restaurant/${id}/delete`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Ошибка удаления меню')
      }
      setDeleting(false)
    }
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {restaurants.map((r) => (
          <li
            key={r.id}
            className="relative bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-700 hover:border-teal-500 group"
          >
            {/* Кнопка редактирования */}
            <button
              onClick={() => handleEdit(r.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white z-10 p-2"
              title="Редактировать ресторан"
            >
              <FaEdit size={18} />
            </button>

            <button
            onClick={() => handleDelete(r.id)}
            disabled={deleting}
            className="absolute bottom-3 right-2 text-rose-600 hover:text-rose-500 z-10 p-2 disabled:opacity-50"
            title="Удалить ресторан"
            >Удалить</button>

            {/* Содержимое карточки */}
            <Link href={`/dashboard/restaurant/${r.id}`} className="block p-4 sm:p-5 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gray-700 shrink-0">
                  <img
                    src={
                      r.logo_url ||
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
                    }
                    alt="Логотип ресторана"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left w-full">
                  <p className="text-lg font-semibold text-teal-400">{r.name}</p>
                  <p className="text-sm text-gray-400 mt-1 break-all">
                    ID: <code>{r.id}</code>
                  </p>
                  <p className="mt-3 text-sm text-gray-400 group-hover:text-white transition">
                    Перейти к меню →
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {selectedId && (
        <EditRestaurantModal
          restaurantId={selectedId}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false)
            setSelectedId(null)
          }}
        />
      )}
    </>
  )
}
