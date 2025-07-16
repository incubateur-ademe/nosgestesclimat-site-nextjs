// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import ProgressCircle from './ProgressCircle'

const meta: Meta<typeof ProgressCircle> = {
  title: 'Design System/Utils/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Progression de 0 à 1',
    },
    white: {
      control: 'boolean',
      description: 'Variante blanche pour fond sombre',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressCircle>

export const Default: Story = {
  args: {
    progress: 0.75,
  },
}

export const Start: Story = {
  args: {
    progress: 0,
  },
}

export const Complete: Story = {
  args: {
    progress: 1,
  },
}

export const White: Story = {
  args: {
    progress: 0.5,
    white: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="bg-primary-700 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
}
