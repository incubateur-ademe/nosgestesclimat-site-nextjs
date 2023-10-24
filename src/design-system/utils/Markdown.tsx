'use client'

import Link from '@/components/Link'
import MarkdownToJsx, { MarkdownToJSX } from 'markdown-to-jsx'
import { ComponentProps } from 'react'

type MarkdownProps = ComponentProps<typeof MarkdownToJsx> & {
  className?: string
  components?: MarkdownToJSX.Overrides
  renderers?: Record<string, unknown>
}

export default function Markdown({
  children,
  components = {},
  ...otherProps
}: MarkdownProps) {
  return (
    <MarkdownToJsx
      {...otherProps}
      options={{
        ...otherProps.options,
        forceBlock: true,
        overrides: {
          a: Link,
          ...components,
        },
      }}
    >
      {children}
    </MarkdownToJsx>
  )
}
