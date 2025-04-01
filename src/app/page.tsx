import { Header } from '@/components/Header'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <Header session={session} />
      <section className="w-full min-h-[calc(100vh-72px)] flex flex-col items-center justify-center text-center px-6 py-20 sm:py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white drop-shadow-xl">
            Добро пожаловать в <span className="text-teal-400">Твоё Меню</span> 🍽️
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
            Умный способ представить меню вашего ресторана онлайн. <br />
            Создавайте, редактируйте, делитесь QR — быстро и удобно.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link
                href="/dashboard"
                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded shadow-lg transition-all duration-200"
              >
                Управление меню
              </Link>
            ) : (
              <Link
                href="/auth"
                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded shadow-lg transition-all duration-200"
              >
                Войти
              </Link>
            )}

            <Link
              href="/contacts"
              className="border border-gray-400 hover:border-teal-400 text-gray-300 hover:text-teal-400 font-semibold py-3 px-8 rounded shadow-sm transition-all duration-200"
            >
              Контакты
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            🌗 Автоматическая смена темы уже работает
          </div>
        </div>
      </section>
    </>
  )
}
