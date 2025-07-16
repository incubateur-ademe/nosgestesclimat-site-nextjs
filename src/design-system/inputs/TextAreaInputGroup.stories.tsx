// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import TextAreaInputGroup from './TextAreaInputGroup'

const meta: Meta<typeof TextAreaInputGroup> = {
  title: 'Design System/Inputs/TextAreaInputGroup',
  component: TextAreaInputGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Nom du champ' },
    label: { control: 'text', description: 'Label du champ' },
    value: { control: 'text', description: 'Valeur du textarea' },
    placeholder: { control: 'text', description: 'Placeholder' },
    onChange: { action: 'changed', description: 'Callback de changement' },
    className: { control: 'text', description: 'Classes CSS additionnelles' },
  },
}

export default meta

type Story = StoryObj<typeof TextAreaInputGroup>

export const Default: Story = {
  args: { name: 'textarea', label: 'Votre message' },
}

export const WithValue: Story = {
  args: { name: 'textarea', label: 'Votre message', value: 'Texte pré-rempli' },
}

export const WithPlaceholder: Story = {
  args: {
    name: 'textarea',
    label: 'Votre message',
    placeholder: 'Saisissez votre texte...',
  },
}

export const CustomClass: Story = {
  args: {
    name: 'textarea',
    label: 'Message',
    className: 'bg-blue-50 p-2 rounded',
  },
}
