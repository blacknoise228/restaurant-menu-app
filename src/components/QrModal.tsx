'use client'

import { useEffect, useRef, useState } from 'react'
import Portal from './Portal'
import QRCodeStyling from 'qr-code-styling'
import { motion, AnimatePresence } from 'framer-motion'

export default function PublicRestaurantQR({ restaurantId, icon, baseUrl}: { restaurantId: string, icon: string, baseUrl: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const qrContainerRef = useRef<HTMLDivElement>(null)
  const qrInstanceRef = useRef<QRCodeStyling | null>(null)

  // Формируем публичную ссылку
  const publicUrl = `${baseUrl}/public/${restaurantId}`

  // При открытии модального окна создаем новый экземпляр QR-кода
  useEffect(() => {
    if (isOpen && qrContainerRef.current) {
      // Создаем экземпляр QRCodeStyling с фиксированным размером 512px
      qrInstanceRef.current = new QRCodeStyling({
        width: 512,
        height: 512,
        data: publicUrl,
        image: icon, // Например, "/logo.png"
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20,
        },
      })
      // Очищаем контейнер и вставляем QR-код
      qrContainerRef.current.innerHTML = ""
      qrInstanceRef.current.append(qrContainerRef.current)

      // Применяем стили для адаптивного масштабирования: заставляем canvas быть резиновым
      setTimeout(() => {
        const canvas = qrContainerRef.current?.querySelector('canvas')
        if (canvas) {
          canvas.style.width = '100%'
          canvas.style.height = 'auto'
        }
      }, 50)
    }
  }, [isOpen, baseUrl, restaurantId, icon, publicUrl])

  const downloadPng = () => {
    if (!qrInstanceRef.current) return
    qrInstanceRef.current.download({ extension: 'png' })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-2 rounded bg-teal-600 hover:bg-teal-500 text-white"
      >
        Показать QR
      </button>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 1, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="relative inline-block p-6 bg-white dark:bg-gray-900 rounded shadow-xl text-center max-h-[90vh] overflow-auto"
              >
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                  {/* Фоновый оверлей */}
                  <div
                    className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                  />
                  {/* Модальное окно */}
                  <div className="relative inline-block p-6 bg-white dark:bg-gray-900 rounded shadow-xl text-center max-h-[90vh] overflow-auto">
                    <h2 className="text-lg font-semibold mb-4">Публичная ссылка</h2>
                    {/* Контейнер для QR-кода с адаптивной шириной */}
                    <div style={{ width: 'min(512px, 70vw)', margin: '0 auto' }}>
                      <div
                        ref={qrContainerRef}
                        className="mx-auto"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={downloadPng}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Скачать PNG
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}
