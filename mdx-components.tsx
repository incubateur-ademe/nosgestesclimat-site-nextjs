// THIS FILE ONLY ADD COMPONENTS TO MDX PAGES. THE BLOG POSTS COMPONENTS ARE IN THE `utils/Markdown` COMPONENT.

import type { MDXComponents } from 'mdx/types'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: Title,
    ButtonLink: (props: any) => (
      <div className="text-center">
        <ButtonLink href={props.href}>{props.children}</ButtonLink>
      </div>
    ),
    img: (props: any) => (
      <Image
        sizes="100vw"
        width={props.width ?? 900}
        height={props.height ?? 500}
        style={{ width: '100%', height: 'auto' }}
        alt={props.alt as string}
        {...(props as any)}
      />
    ),
    ...components,
  }
}
