import type { Meta, StoryObj } from '@storybook/nextjs'
import SeeGroupResultsBanner from './SeeGroupResultsBanner'

const meta: Meta<typeof SeeGroupResultsBanner> = {
  title: 'Components/SeeGroupResultsBanner',
  component: SeeGroupResultsBanner,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: 'select',
      options: ['fr', 'en'],
    },
    name: {
      control: 'text',
      description: 'Nom du groupe ou de la campagne (utilisé pour le mock)',
    },
  },
}

export default meta
type Story = StoryObj<typeof SeeGroupResultsBanner>

// Simplified Template using Storybook 8's experimentalRSC support
const Template: Story = {
  render: (args) => {
    // @ts-ignore - SeeGroupResultsBanner is an async component
    return <SeeGroupResultsBanner {...args} />
  },
}

export const GroupBanner: Story = {
  ...Template,
  args: {
    locale: 'fr',
    url: '/group-456',
    name: 'Mon Super Groupe',
  },
}

export const PollBanner: Story = {
  ...Template,
  args: {
    locale: 'fr',
    url: '/poll-789',
    name: 'Ma Campagne Climat',
  },
}
