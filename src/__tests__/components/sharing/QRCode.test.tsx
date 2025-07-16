import QRCode from '@/components/sharing/QRCode'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock react-qr-code
vi.mock('react-qr-code', () => ({
  default: ({ value, 'data-testid': testId, ...props }: any) => (
    <svg data-testid={testId} {...props}>
      <text>QR Code for: {value}</text>
    </svg>
  ),
}))

describe('QRCode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the QR code container with correct test ID', () => {
    render(<QRCode value="https://example.com" />)

    const container = screen.getByTestId('qrcode-container')
    expect(container).toBeInTheDocument()
  })

  it('renders the QR code wrapper with correct test ID', () => {
    render(<QRCode value="https://example.com" />)

    const wrapper = screen.getByTestId('qrcode-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('renders the QR code SVG with correct test ID', () => {
    render(<QRCode value="https://example.com" />)

    const svg = screen.getByTestId('qrcode-svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveTextContent('QR Code for: https://example.com')
  })

  it('renders the download button with correct test ID', () => {
    render(<QRCode value="https://example.com" />)

    const button = screen.getByTestId('qrcode-download-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Télécharger le QR Code')
  })

  it('passes the correct value to the QR code component', () => {
    const testValue = 'https://test-url.com'
    render(<QRCode value={testValue} />)

    const svg = screen.getByTestId('qrcode-svg')
    expect(svg).toHaveTextContent(`QR Code for: ${testValue}`)
  })

  it('applies custom className to the container', () => {
    const customClass = 'custom-class'
    render(<QRCode value="https://example.com" className={customClass} />)

    const container = screen.getByTestId('qrcode-container')
    expect(container).toHaveClass(customClass)
  })

  it('handles download button click without errors', () => {
    // Mock the necessary DOM APIs for the download functionality
    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => ({
        scale: vi.fn(),
        fillStyle: '',
        fillRect: vi.fn(),
        drawImage: vi.fn(),
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'low',
      })),
      toDataURL: vi.fn(() => 'data:image/png;base64,mock-data'),
    }

    const mockDownloadLink = {
      download: '',
      href: '',
      click: vi.fn(),
    }

    const mockImage = {
      onload: null as (() => void) | null,
      src: '',
    }

    // Mock document.createElement
    const originalCreateElement = document.createElement
    document.createElement = vi.fn((tagName: string) => {
      if (tagName === 'canvas') {
        return mockCanvas as any
      }
      if (tagName === 'a') {
        return mockDownloadLink as any
      }
      if (tagName === 'img') {
        return mockImage as any
      }
      return originalCreateElement.call(document, tagName)
    })

    // Mock XMLSerializer
    global.XMLSerializer = vi.fn(() => ({
      serializeToString: vi.fn(() => '<svg>mock-svg</svg>'),
    })) as any

    // Mock encodeURIComponent
    vi.spyOn(global, 'encodeURIComponent').mockImplementation(
      (str: string | number | boolean) => `encoded-${String(str)}`
    )

    render(<QRCode value="https://example.com" />)

    const button = screen.getByTestId('qrcode-download-button')

    // This should not throw an error
    expect(() => {
      fireEvent.click(button)
    }).not.toThrow()

    // Restore original createElement
    document.createElement = originalCreateElement
  })

  it('does not download when QR code wrapper ref is null', () => {
    render(<QRCode value="https://example.com" />)

    const button = screen.getByTestId('qrcode-download-button')

    // Mock the wrapper element to return null for querySelector
    const wrapper = screen.getByTestId('qrcode-wrapper')
    Object.defineProperty(wrapper, 'querySelector', {
      value: vi.fn(() => null),
      writable: true,
    })

    const createElementSpy = vi.spyOn(document, 'createElement')

    fireEvent.click(button)

    expect(createElementSpy).not.toHaveBeenCalledWith('canvas')
  })

  it('does not download when SVG element is not found', () => {
    render(<QRCode value="https://example.com" />)

    const button = screen.getByTestId('qrcode-download-button')

    // Mock the wrapper element to return null for querySelector
    const wrapper = screen.getByTestId('qrcode-wrapper')
    Object.defineProperty(wrapper, 'querySelector', {
      value: vi.fn(() => null),
      writable: true,
    })

    const createElementSpy = vi.spyOn(document, 'createElement')

    fireEvent.click(button)

    expect(createElementSpy).not.toHaveBeenCalledWith('canvas')
  })

  it('has correct SVG attributes', () => {
    render(<QRCode value="https://example.com" />)

    const svg = screen.getByTestId('qrcode-svg')
    expect(svg).toHaveAttribute('fgColor', '#373978')
    expect(svg).toHaveStyle({
      height: 'auto',
      maxWidth: '100%',
      width: '200px',
      background: 'white',
    })
  })
})
