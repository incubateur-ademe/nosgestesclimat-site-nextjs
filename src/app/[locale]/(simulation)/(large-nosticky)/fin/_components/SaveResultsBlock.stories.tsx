import QueryClientProviderWrapper from "@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper"
import UserProvider from '@/publicodes-state/providers/userProvider/provider'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { http, HttpResponse } from 'msw'
import SaveResultsBlock from './SaveResultsBlock'

const meta: Meta<typeof SaveResultsBlock> = {
  title: 'App/Simulation/Fin/Components/SaveResultsBlock',
  component: SaveResultsBlock,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: [
        // Mock "Send Code" (Verification Code)
        http.post('*/verification-codes/v1', () => {
          return HttpResponse.json({
            success: true,
            expirationDate: new Date(Date.now() + 3600000).toISOString(),
          })
        }),
        // Mock "Verify Code" and "Save Simulation"
        http.post('*/simulations/v1/:userId', () => {
          return HttpResponse.json({
            id: 'mock-sim-id',
            userId: 'mock-user-id',
            email: 'test@example.com',
          })
        }),
        // Optional: mock user retrieval if needed after login
        http.get('*/users/v1/:userId', () => {
          return HttpResponse.json({
            userId: 'mock-user-id',
            email: 'test@example.com',
          })
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProviderWrapper>
        <UserProvider>
          <Story />
        </UserProvider>
      </QueryClientProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: 'radio',
      options: ['fr', 'en'],
      description: 'Locale for translations',
    },
  },
}

export default meta
type Story = StoryObj<typeof SaveResultsBlock>

export const Unauthenticated: Story = {
  args: {
    locale: 'fr',
    isAuthentified: false,
  },
}

export const Authenticated: Story = {
  args: {
    locale: 'fr',
    isAuthentified: true,
  },
}
