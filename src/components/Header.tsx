'use client'

import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export function Header({ session }: { session: Session | null }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <header className="w-full z-50 px-6 sm:px-10 py-5 sm:py-6 bg-gray-900/90 backdrop-blur-md shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип + Название */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl font-black text-teal-400 hover:text-teal-300 transition duration-200 drop-shadow-sm">
            PlatoQR
          </span>
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-4 sm:gap-6">
          {session && (
            <Link
              href="/dashboard"
              className="text-lg font-medium text-gray-300 hover:text-white transition duration-200"
            >
              Панель
            </Link>
          )}

          {session ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
            >
              Выйти
            </button>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="bg-teal-600 hover:bg-teal-500 text-white text-sm sm:text-base font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
            >
              Войти
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
