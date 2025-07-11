// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import CheckboxInputGroup from './CheckboxInputGroup'

const meta: Meta<typeof CheckboxInputGroup> = {
  title: 'Design System/Inputs/CheckboxInputGroup',
  component: CheckboxInputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the checkbox is invalid',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    value: {
      control: 'boolean',
      description: 'Controlled value of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xl'],
      description: 'Size of the checkbox',
    },
    disableSubmitOnEnter: {
      control: 'boolean',
      description: 'Whether to disable form submission on Enter key',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxInputGroup>

export const Default: Story = {
  args: {
    name: 'example',
    label: "J'accepte les conditions d'utilisation",
  },
}

export const Checked: Story = {
  args: {
    name: 'example-checked',
    label: 'Recevoir les newsletters',
    defaultChecked: true,
  },
}

export const WithError: Story = {
  args: {
    name: 'example-error',
    label: 'Accepter les conditions',
    error: 'Vous devez accepter les conditions pour continuer',
  },
}

export const Required: Story = {
  args: {
    name: 'example-required',
    label: "J'accepte les conditions d'utilisation",
    required: true,
  },
}

export const LargeSize: Story = {
  args: {
    name: 'example-large',
    label: 'Checkbox de grande taille',
    size: 'lg',
  },
}

export const ExtraLargeSize: Story = {
  args: {
    name: 'example-xl',
    label: 'Checkbox extra large',
    size: 'xl',
  },
}

export const LongLabel: Story = {
  args: {
    name: 'example-long',
    label:
      "Un label très long qui pourrait déborder sur plusieurs lignes pour tester l'affichage du composant checkbox avec du texte étendu",
  },
}

export const WithCustomStyling: Story = {
  args: {
    name: 'example-custom',
    label: 'Checkbox avec style personnalisé',
    className: 'bg-blue-50 p-4 rounded-lg',
  },
}

export const Controlled: Story = {
  args: {
    name: 'example-controlled',
    label: 'Checkbox contrôlé',
    value: true,
  },
}
