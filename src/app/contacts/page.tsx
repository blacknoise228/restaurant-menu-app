'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaTelegramPlane, FaEnvelope, FaGithub, FaDonate } from 'react-icons/fa'
import DonateForm from '@/components/DonateFormModal'

export default function ContactsPage() {
  const [showDonate, setShowDonate] = useState(false)

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6 py-12">
      <div className="max-w-3xl mx-auto text-white text-center animate-fade-in">
        <h1 className="text-4xl font-extrabold text-teal-400 mb-6 drop-shadow">📞 Контакты</h1>

        <p className="text-gray-300 text-lg mb-8">
          Есть вопросы, предложения или хочешь сотрудничать? Мы всегда на связи!
        </p>

        <div className="space-y-6">
          <ContactItem
            icon={<FaTelegramPlane size={24} />}
            label="Telegram"
            href="https://t.me/blacknoise228"
          />
          <ContactItem
            icon={<FaEnvelope size={24} />}
            label="Email"
            href="mailto:blacknoise228@gmail.com"
          />
          <ContactItem
            icon={<FaGithub size={24} />}
            label="GitHub"
            href="https://github.com/blacknoise228"
          />
          <button
            onClick={() => setShowDonate(true)}
            className="flex items-center justify-center gap-3 w-full p-4 bg-teal-600 hover:bg-teal-500 rounded-lg transition-all font-semibold text-white"
          >
            <FaDonate size={20} />
            Поддержать проект
          </button>
        </div>
      </div>

      {showDonate && <DonateForm onClose={() => setShowDonate(false)} />}
    </div>
  )
}

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all duration-200"
    >
      <span className="text-teal-400">{icon}</span>
      <span className="font-semibold text-white">{label}</span>
    </Link>
  )
}
