// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import LandingPage from './LandingPage'

const queryClient = new QueryClient()

const meta: Meta<typeof LandingPage> = {
  title: 'Design System/Layout/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LandingPage>

export const Default: Story = {
  args: {
    heroTitle: 'Bienvenue sur Notre Plateforme',
    heroDescription:
      'Ceci est une description pour la section héros de la page de destination. Elle est conçue pour être engageante et informative.',
    heroIllustration: (
      <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gray-300">
        Illustration
      </div>
    ),
    heroPartners: (
      <div className="flex items-center gap-4">
        <span>Partenaire A</span>
        <span>Partenaire B</span>
      </div>
    ),
    children: (
      <div className="p-8">
        <h2>Contenu principal de la page</h2>
        <p>
          Le reste du contenu de la page de destination vient ici. Cela peut
          inclure des sections sur les fonctionnalités, des témoignages, des
          appels à l'action, etc.
        </p>
      </div>
    ),
  },
}
