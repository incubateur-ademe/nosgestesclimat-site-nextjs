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
      options: ['fr', 'en', 'es'],
      description: 'Locale for translations',
    },
  },
}

export default meta
type Story = StoryObj<typeof SaveResultsBlock>

export const Default: Story = {
  args: {
    locale: 'fr',
  },
}

export const English: Story = {
  args: {
    locale: 'en',
  },
}
