// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'Design System/Inputs/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Nom du champ' },
    label: { control: 'text', description: 'Label du champ' },
    value: { control: 'text', description: 'Valeur sélectionnée' },
    onChange: { action: 'changed', description: 'Callback de changement' },
    className: { control: 'text', description: 'Classes CSS additionnelles' },
    error: { control: 'text', description: "Message d'erreur" },
    helperText: { control: 'text', description: "Texte d'aide" },
    required: { control: 'boolean', description: 'Champ requis' },
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    name: 'select',
    label: 'Choisissez une option',
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  },
}

export const WithValue: Story = {
  args: {
    name: 'select',
    label: 'Choisissez une option',
    value: 'option2',
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  },
}

export const WithError: Story = {
  args: {
    name: 'select',
    label: 'Faites un choix',
    error: 'Ce champ est obligatoire.',
    children: (
      <>
        <option value="">--Choisissez--</option>
        <option value="option1">Option 1</option>
      </>
    ),
  },
}

export const WithHelperText: Story = {
  args: {
    name: 'select',
    label: 'Votre pays',
    helperText: 'Le pays de résidence fiscale.',
    children: (
      <>
        <option value="fr">France</option>
        <option value="es">Espagne</option>
        <option value="it">Italie</option>
      </>
    ),
  },
}
