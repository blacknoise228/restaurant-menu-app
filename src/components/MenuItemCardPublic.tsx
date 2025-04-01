'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
  }
  onClick?: () => void
}

export default function MenuItemCardPublic({ item, onClick }: MenuItemCardProps) {
  return (
    <li
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-teal-500/20 transition-all flex flex-col"
      style={{ minHeight: '340px' }}
    >
      {item.image_url && (
        <div className="relative h-48 w-full shrink-0">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="p-4 flex flex-col justify-between gap-2 flex-grow">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-3 min-h-[3.5rem]">
            {item.description}
          </p>
        </div>
        <div className="flex justify-between items-end mt-auto">
          <p className="text-teal-400 font-semibold">💰 {item.price} ₽</p>
          <button
            onClick={onClick}
            className="text-sm text-teal-400 hover:text-white transition"
          >
            Подробнее →
          </button>
        </div>
      </div>
    </li>
  )
}