import type { MDXComponents } from 'mdx/types'

import Title from '@/design-system/layout/Title'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: Title,
    ...components,
  }
}
