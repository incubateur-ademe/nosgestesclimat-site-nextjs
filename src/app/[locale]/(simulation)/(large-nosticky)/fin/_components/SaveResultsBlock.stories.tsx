import QueryClientProviderWrapper from "@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper"
import UserProvider from '@/publicodes-state/providers/userProvider/provider'
import type { Meta, StoryObj } from '@storybook/nextjs'
import SaveResultsBlock from './SaveResultsBlock'

const meta: Meta<typeof SaveResultsBlock> = {
  title: 'App/Simulation/Fin/Components/SaveResultsBlock',
  component: SaveResultsBlock,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
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
    user: null,
  },
}

export const Authenticated: Story = {
  args: {
    locale: 'fr',
    user: { id: '123', email: 'test@test.com' },
  },
}
