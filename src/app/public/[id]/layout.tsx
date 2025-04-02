import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

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
    .select('name, logo_url')
    .eq('id', id)
    .single()

  const logoUrl =
    restaurant?.logo_url ||
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'

  return (
    <html lang="ru" className="scrollbar-hide">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <header className="w-full px-4 sm:px-6 py-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md shadow-lg z-50">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
            <div className="w-24 h-24 relative">
              <Image
                src={logoUrl}
                alt="Логотип ресторана"
                fill
                className="object-cover rounded-full border border-gray-700"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-400 drop-shadow-sm text-center">
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
