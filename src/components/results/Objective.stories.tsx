import type { Meta, StoryObj } from '@storybook/react'
import Objective from './Objective'

const meta: Meta<typeof Objective> = {
  title: 'Components/Results/Objective',
  component: Objective,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: 'select',
      options: ['fr', 'en'],
      description: 'Langue de rendu (fr ou en)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Objective>

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
