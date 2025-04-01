import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { createClient } from '@/utils/supabase/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Публичное меню',
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const supabase = await createClient()
  const { id } = await params

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name')
    .eq('id', id)
    .single()

  return (
    <html lang="ru" className="scrollbar-hide">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <header className="w-full px-4 sm:px-6 py-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md shadow-lg z-50">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-400 drop-shadow-sm">
              🍽 {restaurant?.name || 'Неизвестный ресторан'}
            </h1>
          </div>
        </header>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
