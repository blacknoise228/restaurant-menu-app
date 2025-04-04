// components/StyledQRCode.tsx
'use client'
import { useEffect, useRef } from 'react'

interface StyledQRCodeProps {
  data: string
  logo?: string
  width?: number
  height?: number
}

export default function StyledQRCode({
  data,
  logo = '/logo.png',
  width = 512,
  height = 512,
}: StyledQRCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<any>(null)

  useEffect(() => {
    (async () => {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      qrCodeRef.current = new QRCodeStyling({
        width,
        height,
        data,
        image: logo,
        dotsOptions: {
          color: "#000000",
          type: "rounded", // варианты: "rounded", "dots", "classy", "classy-rounded", "square", "extra-rounded"
        },
        backgroundOptions: {
          color: "#FFFFFF",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
        },
      })
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
        qrCodeRef.current.append(containerRef.current)
      }
    })()
  }, [data, logo, width, height])

  return <div ref={containerRef} style={{ width: 'min(512px, 70vw)' }} />
}
