'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import { useRef } from 'react'
import QRCodeLib from 'react-qr-code'

type QRCodeProps = {
  value: string
}

export default function QRCode({ value }: QRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    // Get the actual size of the QR code element
    const qrElement = qrRef.current
    const rect = qrElement.getBoundingClientRect()

    // Add padding for better scanability (20% of QR code size)
    const padding = rect.width * 0.2

    // Create a high-resolution canvas (2x for better quality)
    const scale = 2
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // Set canvas size to include padding
    canvas.width = (rect.width + padding * 2) * scale
    canvas.height = (rect.height + padding * 2) * scale

    // Scale the context to match the canvas size
    ctx.scale(scale, scale)

    // Set white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, rect.width + padding * 2, rect.height + padding * 2)

    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    img.onload = () => {
      // Draw the SVG with padding around it
      ctx.drawImage(img, padding, padding, rect.width, rect.height)

      // Convert to PNG with maximum quality
      const pngFile = canvas.toDataURL('image/png', 1.0)

      const downloadLink = document.createElement('a')
      downloadLink.download = 'qrcode.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }

    // Use proper SVG data URL encoding
    const encodedSvg = encodeURIComponent(svgData)
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodedSvg
  }

  return (
    <div className="flex flex-row items-center gap-4 md:flex-col md:gap-6">
      <div
        ref={qrRef}
        className="rounded-xl border-2 border-gray-200 bg-white p-4">
        <QRCodeLib
          value={value}
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '200px',
            background: 'white',
          }}
          fgColor="#373978"
        />
      </div>
      <Button onClick={downloadQRCode}>
        <Trans>Télécharger le QR code</Trans>
      </Button>
    </div>
  )
}
