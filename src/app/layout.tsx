import './globals.css'
import { Inter } from 'next/font/google'
import { createClient } from '@/utils/supabase/server'
import { SessionProvider } from '@/components/SessionProvider'
import { CustomToaster } from '@/components/CustomToaster'
import DonateForm from '@/components/DonateFormModal'
import ClientFooter from '@/components/ClientFooter'

export const metadata = {
  title: '🍽️ Мой Ресторан',
  description: 'Управление меню ресторана',
}

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="ru" className="scrollbar-hide">
      <body className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}>
        <SessionProvider session={session}>
          <CustomToaster />
          <div className="min-h-screen flex flex-col">{children}</div>
        </SessionProvider>
        <ClientFooter />
      </body>
    </html>
  )
}
