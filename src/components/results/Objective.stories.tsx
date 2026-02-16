import type { Meta, StoryObj } from '@storybook/react'
import Objective from './Objective'
import ObjectiveChart from './objective/ObjectiveChart'

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
    carbonFootprint: 10000,
  },
}

export const Over7Tons: Story = {
  args: {
    locale: 'fr',
    carbonFootprint: 12000,
  },
}

export const Under7Tons: Story = {
  args: {
    locale: 'fr',
    carbonFootprint: 6000,
  },
}

export const Under4TonsEnglish: Story = {
  args: {
    locale: 'fr',
    carbonFootprint: 4000,
  },
}

export const ChartOnly: StoryObj<typeof ObjectiveChart> = {
  render: (args: React.ComponentProps<typeof ObjectiveChart>) => (
    <div className="w-[800px]">
      <ObjectiveChart {...args} />
    </div>
  ),
  args: {
    carbonFootprint: 9000,
  },
}
