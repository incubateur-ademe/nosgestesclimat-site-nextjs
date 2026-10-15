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
  },
}

export default meta
type Story = StoryObj<typeof Objective>

export const Over7Tons: Story = {
  args: {
    carbonFootprint: 12000,
  },
}

export const Is7Tons: Story = {
  args: {
    carbonFootprint: 7000,
  },
}

export const Under7Tons: Story = {
  args: {
    carbonFootprint: 6000,
  },
}

export const Under4Tons: Story = {
  args: {
    carbonFootprint: 4000,
  },
}
