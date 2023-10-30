import { MDXProps } from 'mdx/types'
import { ReactElement } from 'react'

export type Post = {
  date: string
  title: string
  slug: string
  content: (props: MDXProps) => ReactElement
  description?: string
  image?: string
}
