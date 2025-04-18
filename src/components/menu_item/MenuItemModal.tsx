'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
}

interface MenuItemModalProps {
  item: MenuItem
  isOpen: boolean
  onClose: () => void
}

export default function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg max-h-[85vh] overflow-hidden relative flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10"
            >
              &times;
            </button>

            <div className="flex-grow overflow-y-auto p-6 pt-14 flex flex-col gap-4">
              {item.image_url && (
                <div className="relative w-full aspect-square rounded overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-2xl font-bold">{item.name}</h2>

              <p className="text-base text-gray-300 whitespace-pre-wrap">
                {item.description}
              </p>

              <div className="mt-auto text-right pt-4">
                <p className="text-lg font-semibold text-teal-400">
                  💰 {item.price} тг
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
