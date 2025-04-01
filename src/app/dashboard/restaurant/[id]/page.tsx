import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AddMenuForm from '@/components/AddMenuForm'
import PublicRestaurantQR from '@/components/QrModal'

interface Props {
  params: { id: string }
}

export default async function RestaurantPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

    const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single()

  if (!restaurant) notFound()

  const { data: menus } = await supabase
    .from('menus')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('created_at', { ascending: false })

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-10">
  <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
    <div className="text-center space-y-2">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
        🍽 Меню ресторана
      </h1>
      <p className="text-teal-400 text-lg">{restaurant.name}</p>
    </div>

    <div className="grid sm:grid-cols-1 gap-5">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">🔗 QR доступ</h2>
        <PublicRestaurantQR restaurantId={restaurant.id} />
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">➕ Добавить меню</h2>
        <AddMenuForm restaurantId={restaurant.id} />
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-white mb-4">📋 Все меню</h2>
      {menus && menus.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-4">
          {menus.map((menu) => (
            <li key={menu.id}>
              <Link
                href={`/dashboard/menu/${menu.id}`}
                className="block bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-5 transition-all shadow-md"
              >
                <p className="text-lg font-semibold text-white">{menu.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic">У этого ресторана пока нет меню.</p>
      )}
    </div>
  </div>
</section>

  )
}