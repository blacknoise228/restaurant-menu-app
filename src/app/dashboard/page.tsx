import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AddRestaurantForm } from '@/components/AddRestaurantForm'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/auth')

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  return (
    <section className="w-full min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-12 sm:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow">
          🏠 Панель управления
        </h1>
        <p className="text-gray-300 text-lg">
          Здесь вы можете управлять своими ресторанами, меню и блюдами.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <AddRestaurantForm />
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-white mb-6">📋 Ваши рестораны</h2>

        {restaurants?.length ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {restaurants.map((r) => (
              <li key={r.id} className="bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-700 hover:border-teal-500">
                <Link href={`/dashboard/restaurant/${r.id}`} className="block p-5">
                  <p className="text-lg font-semibold text-teal-400">{r.name}</p>
                  <p className="text-sm text-gray-400 mt-1 truncate">
                    ID: <code>{r.id}</code>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 mt-8">У вас пока нет ресторанов.</p>
        )}
      </div>
    </section>
  )
}
