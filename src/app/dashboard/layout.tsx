import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { SessionProvider } from '@/components/SessionProvider'
import { Header } from '@/components/Header'
import '@/app/globals.css'
import { CustomToaster } from '@/components/CustomToaster'

const inter = Inter({ subsets: ['latin'] })

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/auth')
    
  return (
    <>
      <Header session={session} />
      <CustomToaster />
      <SessionProvider session={session}>
        <CustomToaster />
        <div className="min-h-screen flex flex-col">{children}</div>
      </SessionProvider>

    </>
  )
}
