import type { Meta, StoryObj } from '@storybook/nextjs'
import FootprintBlock from './FootprintBlock'

const meta: Meta<typeof FootprintBlock> = {
  title: 'App/Simulation/Fin/Components/FootprintBlock',
  component: FootprintBlock,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
  argTypes: {
    metric: {
      control: 'radio',
      options: ['carbone', 'eau'],
      description: 'Métrique affichée',
    },
    tendency: {
      control: 'radio',
      options: ['increase', 'decrease', undefined],
      description: 'Tendance par rapport au résultat précédent',
    },
    value: {
      control: 'number',
      description: "Valeur de l'empreinte en kg",
    },
  },
}

export default meta
type Story = StoryObj<typeof FootprintBlock>

// --- Métrique Carbone ---

export const CarboneEnBaisse: Story = {
  name: 'Carbone - En baisse',
  args: {
    value: 6500,
    title: 'Votre empreinte carbone',
    metric: 'carbone',
    unitSuffix: 'de CO₂e / an',
    tendency: 'decrease',
  },
}

export const CarboneEnHausse: Story = {
  name: 'Carbone - En hausse',
  args: {
    value: 9800,
    title: 'Votre empreinte carbone',
    metric: 'carbone',
    unitSuffix: 'de CO₂e / an',
    tendency: 'increase',
  },
}

export const CarboneSansTendance: Story = {
  name: 'Carbone - Sans tendance',
  args: {
    value: 8200,
    title: 'Votre empreinte carbone',
    metric: 'carbone',
    unitSuffix: 'de CO₂e / an',
    tendency: undefined,
  },
}

// --- Métrique Eau ---

export const EauEnBaisse: Story = {
  name: 'Eau - En baisse',
  args: {
    value: 3500,
    title: 'Votre empreinte eau',
    metric: 'eau',
    unitSuffix: '/ jour',
    tendency: 'decrease',
  },
}

export const EauEnHausse: Story = {
  name: 'Eau - En hausse',
  args: {
    value: 5200,
    title: 'Votre empreinte eau',
    metric: 'eau',
    unitSuffix: '/ jour',
    tendency: 'increase',
  },
}

export const EauSansTendance: Story = {
  name: 'Eau - Sans tendance',
  args: {
    value: 4100,
    title: 'Votre empreinte eau',
    metric: 'eau',
    unitSuffix: '/ jour',
    tendency: undefined,
  },
}
