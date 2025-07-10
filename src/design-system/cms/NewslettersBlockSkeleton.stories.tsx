// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import NewslettersBlockSkeleton from './NewslettersBlockSkeleton'

const meta: Meta<typeof NewslettersBlockSkeleton> = {
  title: 'Design System/CMS/NewslettersBlockSkeleton',
  component: NewslettersBlockSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NewslettersBlockSkeleton>

export const Default: Story = {
  args: {},
}

export const WithDarkBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8">
        <Story />
      </div>
    ),
  ],
}

export const WithLightBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <Story />
      </div>
    ),
  ],
}
