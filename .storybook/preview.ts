import type { Preview } from '@storybook/nextjs'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/app/[locale]/globals.css'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
