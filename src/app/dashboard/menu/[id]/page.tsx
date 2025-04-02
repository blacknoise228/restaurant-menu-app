'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AddMenuItemForm from '@/components/AddMenuItemForm'
import MenuItemCard from '@/components/MenuItemCard'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  menu_id: string
  created_at: string
}

interface Menu {
  id: string
  title: string
  restaurant_id: string
}

export default function MenuPage() {
  const { id } = useParams()

  const menuId = id as string

  const [menu, setMenu] = useState<Menu | null>(null)
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!menuId || typeof menuId !== 'string') return

    const fetchData = async () => {
      const resMenu = await fetch(`/api/menu/${menuId}`)
      const menuData = await resMenu.json()
      setMenu(menuData)

      const resItems = await fetch(`/api/menu/${menuId}/items`)
      const itemsData = await resItems.json()
      setItems(itemsData)

      setLoading(false)
    }

    fetchData()
  }, [menuId])

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleUpdate = (updatedItem: MenuItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
  }

  if (loading) return <p className="text-gray-400">Загрузка меню...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-10">
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          📋 Меню: <span className="text-teal-400">{menu?.title}</span>
        </h1>
        <p className="text-gray-400 text-sm">Управляйте блюдами меню</p>
      </div>
  
      {items.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic text-center">Нет добавленных блюд.</p>
      )}
  
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">➕ Добавить блюдо</h2>
        <AddMenuItemForm
          menuId={menuId}
          onAdd={(newItem) => setItems((prev) => [...prev, newItem])}
        />
      </div>
    </div>
  </div>
  
  )
}
