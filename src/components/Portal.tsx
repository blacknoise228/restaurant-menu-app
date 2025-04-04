'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
}

// Если уберёте стейт mounted, всё отрендерится сразу.
export default function Portal({ children }: PortalProps) {
  return typeof window !== 'undefined'
    ? createPortal(children, document.body)
    : null
}
