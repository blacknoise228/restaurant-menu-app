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

          {/* Блок с преимуществами */}
          <div className="space-y-8 mb-10">
            <h2 className="text-3xl font-bold text-teal-400 mb-4">Что мы предлагаем?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">Простота использования</h3>
                <p className="text-gray-300">Создавайте и редактируйте меню ресторана без лишних усилий. Просто, быстро, удобно.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">QR-коды для клиентов</h3>
                <p className="text-gray-300">Сгенерируйте QR-код для каждого меню и предоставьте его своим клиентам для быстрого доступа.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">Мгновенное обновление</h3>
                <p className="text-gray-300">Все изменения в меню моментально отображаются для ваших клиентов. Поддержите актуальность всегда.</p>
              </div>
            </div>
          </div>

          {/* Блок с кнопками */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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

          {/* Инструкция или ссылка для начинающих */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Нужна помощь?</h3>
            <p className="text-gray-300">Начните с регистрации и создайте ваше первое меню. Пошаговое руководство доступно в нашем справочном центре.</p>
            <Link href="/help" className="text-teal-400 hover:text-teal-300 mt-4 block font-semibold">
              Узнать больше
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
