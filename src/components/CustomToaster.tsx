'use client'

import { Toaster } from 'react-hot-toast'

export function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#1f2937', // bg-gray-800
          color: '#fff',
          border: '1px solid #374151', // border-gray-700
          padding: '12px 16px',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        },
        success: {
          iconTheme: {
            primary: '#14b8a6',
            secondary: '#0f766e',
          },
        },
        error: {
          iconTheme: {
            primary: '#f87171',
            secondary: '#991b1b',
          },
        },
      }}
    />
  )
}
