'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Portal from '../Portal'
import EditMenuModal from '../menu/EditMenuModal'

interface MenuItemProps {
  menu: {
    id: string
    title: string
  }
}

export default function MenuItem({ menu }: MenuItemProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleDelete = async () => {
    if (confirm('Вы уверены, что хотите удалить меню?')) {
      setDeleting(true)
      const res = await fetch(`/api/menus/${menu.id}`, {
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
      <li className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white truncate">{menu.title}</h3>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <Link
            href={`/dashboard/menu/${menu.id}`}
            className="text-xs px-3 py-1.5 rounded bg-teal-600 hover:bg-teal-400 text-white transition"
          >
            Открыть
          </Link>

          <button
            onClick={() => setEditing(true)}
            className="text-xs px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-400 text-white transition"
          >
            Редактировать
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-400 text-white transition disabled:opacity-50"
          >
            {deleting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </li>

      {editing && (
        <Portal>
          <EditMenuModal
            menu={menu}
            onClose={() => setEditing(false)}
            onUpdated={() => router.refresh()}
          />
        </Portal>
      )}
    </>
  )
}
