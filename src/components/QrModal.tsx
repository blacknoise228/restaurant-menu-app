'use client'

import { useEffect, useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function PublicRestaurantQR({ restaurantId }: { restaurantId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [baseUrl, setBaseUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fetchBaseUrl = async () => {
      const res = await fetch('/api/url')
      const data = await res.json()
      setBaseUrl(data.baseUrl)
    }
    fetchBaseUrl()
  }, [])

  const publicUrl = `${baseUrl}/public/${restaurantId}`

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    const link = document.createElement('a')
    link.href = pngUrl
    link.download = `restaurant-qr.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-2 rounded bg-teal-600 hover:bg-teal-500 text-white"
      >
        Показать QR
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Фоновый оверлей на весь экран с блюром */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" />

          {/* Адаптивное модальное окно */}
          <div className="relative inline-block p-6 bg-white dark:bg-gray-900 rounded shadow-xl text-center max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Публичная ссылка</h2>
            
            {/* Контейнер для QR-кода, который ограничивает ширину */}
            <div style={{ width: 'min(512px, 70vw)', margin: '0 auto' }}>
              <QRCodeCanvas
                value={publicUrl}
                size={512} // исходный размер для качества
                ref={canvasRef}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="H"
                includeMargin
                // переопределяем размеры canvas для адаптивного масштабирования
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
      )}
    </>
  )
}
