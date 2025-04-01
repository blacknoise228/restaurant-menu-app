'use client'

import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function PublicRestaurantQR({ restaurantId }: { restaurantId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/public/${restaurantId}`

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
        <div className="fixed inset-0 bg-white/60 dark:bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-4">Публичная ссылка</h2>
            <QRCodeCanvas
              value={publicUrl}
              size={512}
              ref={canvasRef}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
              includeMargin
            />
            <div className="mt-4 flex justify-center gap-4">
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
