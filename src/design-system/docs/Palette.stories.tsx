// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import tailwindConfig from '../../../tailwind.config.js'

// Helper function to determine if text should be light or dark based on background
const getTextColor = (bgColor: string): 'text-white' | 'text-black' => {
  if (!bgColor.startsWith('#')) return 'text-black'
  const color = bgColor.substring(1, 7)
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luma > 0.5 ? 'text-black' : 'text-white'
}

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <div
    className="flex h-24 w-full flex-col justify-between rounded-lg p-2 shadow-md"
    style={{ backgroundColor: color }}>
    <span className={`font-bold ${getTextColor(color)}`}>{name}</span>
    <span className={`text-sm ${getTextColor(color)}`}>{color}</span>
  </div>
)

const ColorPalette = ({ colorGroup }: { colorGroup: Record<string, any> }) => {
  return (
    <div className="p-4">
      <h1 className="mb-8 text-4xl font-bold">Palette de couleurs</h1>
      {Object.entries(colorGroup).map(([name, shades]) => (
        <div key={name} className="mb-8">
          <h2 className="mb-4 text-2xl font-bold capitalize">{name}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
            {typeof shades === 'object' ? (
              Object.entries(shades).map(([shade, color]) => (
                <ColorSwatch key={shade} name={shade} color={color as string} />
              ))
            ) : (
              <ColorSwatch name={name} color={shades as string} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const meta: Meta<typeof ColorPalette> = {
  title: 'Design System/Docs/Palette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ColorPalette>

export const Colors: Story = {
  args: {
    colorGroup: tailwindConfig.theme?.extend?.colors ?? {},
  },
}
