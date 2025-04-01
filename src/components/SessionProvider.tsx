'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { type Session } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  const supabase = createClient()

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}
