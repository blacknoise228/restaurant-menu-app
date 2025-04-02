// components/ClientFooter.tsx
'use client'

import { useState } from 'react'
import DonateForm from './DonateFormModal'

export default function ClientFooter() {
  const [isDonationOpen, setIsDonationOpen] = useState(false)

  return (
    <>
      <footer className="mt-auto text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2025 Твоё Меню — Сделано с ❤️</p>
          <div className="space-x-4">
            <button onClick={() => setIsDonationOpen(true)} className="hover:text-teal-400">
              Поддержать 💸
            </button>
            <a href="https://github.com/blacknoise228" target="_blank" className="hover:text-teal-400">GitHub</a>
          </div>
        </div>
      </footer>

      {isDonationOpen && (
        <DonateForm onClose={() => setIsDonationOpen(false)} />
      )}
    </>
  )
}
