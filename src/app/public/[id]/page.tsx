'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { notFound } from 'next/navigation'
import MenuItemCardPublic from '@/components/MenuItemCardPublic'
import MenuItemModal from '@/components/MenuItemModal'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
}

interface Props {
  params: { id: string }
}

export default function PublicRestaurantPage({ params }: Props) {
  const [menus, setMenus] = useState<any[]>([])
  const [menuItems, setMenuItems] = useState<{ [menuId: string]: MenuItem[] }>({})
  const [restaurant, setRestaurant] = useState<{ id: string; name: string } | null>(null)
  const [openMenus, setOpenMenus] = useState<{ [menuId: string]: boolean }>({})
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { id } = await params

      const { data: restaurant } = await supabase
        .from('restaurants')
        .select('id, name')
        .eq('id', id)
        .single()

      if (!restaurant) return notFound()
      setRestaurant(restaurant)

      const { data: menus } = await supabase
        .from('menus')
        .select('id, title')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: true })

      setMenus(menus || [])

      const itemsByMenu: { [menuId: string]: MenuItem[] } = {}

      for (const menu of menus || []) {
        const { data: items } = await supabase
          .from('menu_items')
          .select('*')
          .eq('menu_id', menu.id)
          .order('created_at', { ascending: true })

        itemsByMenu[menu.id] = items || []
      }

      setMenuItems(itemsByMenu)

      const openState: { [menuId: string]: boolean } = {}
      menus?.forEach((menu) => {
        openState[menu.id] = true
      })
      setOpenMenus(openState)
    }

    fetchData()
  }, [params])

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-10">
      <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
        {menus?.length ? (
          menus.map((menu) => (
            <section key={menu.id} className="space-y-4">
              <button
                onClick={() => toggleMenu(menu.id)}
                className="flex justify-between items-center w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
                  📋 {menu.title}
                </h2>
                <span className="text-teal-400 text-xl">
                  {openMenus[menu.id] ? '▲' : '▼'}
                </span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openMenus[menu.id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                {menuItems[menu.id]?.length ? (
                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                    {menuItems[menu.id].map((item) => (
                      <MenuItemCardPublic
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic mt-2">Блюда не найдены.</p>
                )}
              </div>
            </section>
          ))
        ) : (
          <p className="text-gray-500 italic text-center">У этого ресторана нет доступного меню.</p>
        )}
      </div>

      {selectedItem && (
        <MenuItemModal
          item={selectedItem} // теперь точно не null
          isOpen={true}
          onClose={() => setSelectedItem(null)}
        />
      )}


    </div>
  )
}