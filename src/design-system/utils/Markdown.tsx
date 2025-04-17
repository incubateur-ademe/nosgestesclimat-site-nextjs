'use client'

import Link from '@/components/Link'
import NosGestesTransportsBanner from '@/components/blog/NosGestesTransportsBanner'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import MarkdownToJsx from 'markdown-to-jsx'
import Image from 'next/image'
import type { ComponentProps } from 'react'
import ButtonLink from '../buttons/ButtonLink'

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
                  alt={(props.alt as string) ?? ''}
                  {...(props as any)}
                />
              ),
            },
            NosGestesTransportsBanner: NosGestesTransportsBanner,
            button: ButtonLink,
            input: {
              component: ({ ...props }) => {
                // If type if checkbox, return a dummy checkbox not interactive
                if (props.type === 'checkbox') {
                  return <div className="h-4 w-4 rounded-xs bg-gray-200" />
                }
                return <input type={props.type} {...props} />
              },
            },
          },
          ...components,
        }}>
        {children}
      </MarkdownToJsx>
    </div>
  )
}
