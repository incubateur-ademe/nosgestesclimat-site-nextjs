'use client'

import Link from '@/components/Link'
import NosGestesTransportsBanner from '@/components/blog/NosGestesTransportsBanner'
import MarkdownToJsx, { MarkdownToJSX } from 'markdown-to-jsx'
import Image from 'next/image'
import { ComponentProps } from 'react'
import ButtonLink from '../inputs/ButtonLink'

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
    <div className="markdown">
      <MarkdownToJsx
        {...otherProps}
        options={{
          ...otherProps.options,
          forceBlock: true,
          overrides: {
            a: Link,
            img: {
              component: ({ ...props }) => (
                <Image
                  sizes="100vw"
                  width={props.width ?? 900}
                  height={props.height ?? 500}
                  style={{ width: '100%', height: 'auto' }}
                  alt={props.alt as string}
                  {...(props as any)}
                />
              ),
            },
            NosGestesTransportsBanner: NosGestesTransportsBanner,
            button: ButtonLink,
            ...components,
          },
        }}>
        {children}
      </MarkdownToJsx>
    </div>
  )
}
