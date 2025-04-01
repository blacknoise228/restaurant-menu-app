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
                    key="modal-backdrop"
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
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
                        className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] overflow-hidden relative flex flex-col"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10"
                        >
                            &times;
                        </button>

                        <div className="flex-1 overflow-y-auto p-10 pt-24 flex flex-col justify-between">
                            <div>
                                {item.image_url && (
                                    <div className="relative w-full h-150 mb-6 rounded overflow-hidden">
                                        <Image
                                            src={item.image_url}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <h2 className="text-4xl font-bold mb-10 text-white">{item.name}</h2>
                                <p className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed mb-6">
                                    {item.description}
                                </p>


                            </div>

                            <div className="mt-6">
                                <p className="text-xl font-semibold text-teal-400 text-right">
                                    💰 {item.price} ₽
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            )}
        </AnimatePresence>
    )
}
