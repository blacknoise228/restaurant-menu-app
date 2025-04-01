'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

export default function AuthPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      toast.error(error.message || 'Ошибка входа')
    } else {
      toast.success('Успешный вход!')
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setLoading(false)

    if (error) {
      toast.error(error.message || 'Ошибка регистрации')
    } else {
      toast.success('Подтверди email через письмо!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md animate-fade-in">

        <div className="flex justify-center mb-6">
          <span className="text-4xl">🍽️</span>
        </div>

        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Добро пожаловать 👋</h2>

        <div className="space-y-4">
          <input
            autoComplete="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="password"
            autoComplete="current-password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-md font-semibold transition-all duration-200"
          >
            {loading ? (
              <span className="animate-pulse">⏳ Вход...</span>
            ) : (
              'Войти'
            )}

          </button>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full border border-teal-500 text-teal-400 hover:bg-teal-600 hover:text-white py-3 rounded-md font-semibold transition-all duration-200"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Регистрируясь, вы соглашаетесь с нашей политикой конфиденциальности
        </p>
      </div>
    </div>
  )
}
