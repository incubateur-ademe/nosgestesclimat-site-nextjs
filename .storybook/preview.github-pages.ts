import type { Preview } from '@storybook/nextjs'
import '../src/app/[locale]/globals.css'

// No MSW initialization for GitHub Pages build

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [],
}

export default preview

