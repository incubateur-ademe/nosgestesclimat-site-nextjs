// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewslettersBlock from './NewslettersBlock'

const queryClient = new QueryClient()

const meta: Meta<typeof NewslettersBlock> = {
  title: 'Design System/CMS/NewslettersBlock',
  component: NewslettersBlock,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NewslettersBlock>

export const Default: Story = {
  args: {},
}

export const WithMockData: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        // Mock handlers for the component's data fetching
      ],
    },
  },
}
