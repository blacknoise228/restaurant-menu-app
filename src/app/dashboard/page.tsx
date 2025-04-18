// src/app/dashboard/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AddRestaurantForm } from '@/components/restoraunt/AddRestaurantForm'
import RestaurantsListClient from '@/components/restoraunt/RestaurantsListClient'

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
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="flex-grow px-4 py-12 sm:py-16 animate-fade-in">
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
          <RestaurantsListClient restaurants={restaurants || []} />
        </div>
      </div>
    </section>

  )
}