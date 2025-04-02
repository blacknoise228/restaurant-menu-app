'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

export default function DonateForm({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const amountInputRef = useRef<HTMLInputElement>(null)

  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const value = Number(amount)
    if (isNaN(value) || value < 100) {
      toast.error('Минимальная сумма для поддержки — 100 ₽')
      return
    }

    const url = `https://www.donationalerts.com/r/blacknoise228?amount=${value}&message=${encodeURIComponent(
      message
    )}`
    window.open(url, '_blank')
    onClose()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus()
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg max-h-[85vh] overflow-y-auto relative p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl font-bold z-10"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-extrabold mb-6 text-teal-400 text-center">
            💖 Поддержать проект
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              ref={amountInputRef}
              type="number"
              placeholder="Сумма (₽)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={100}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <textarea
              placeholder="Сообщение (необязательно)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={4}
            />

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 py-3 rounded-md font-semibold transition text-white"
            >
              Перейти к оплате 💸
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
