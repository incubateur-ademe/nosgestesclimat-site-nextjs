import { MDXProps } from 'mdx/types'
import { ReactElement } from 'react'

export type BlogPost = {
  date: string
  title: string
  slug: string
  description: string
  content: (props: MDXProps) => ReactElement
  image?: string
}
