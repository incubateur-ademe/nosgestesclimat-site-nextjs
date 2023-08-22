import { MDXProps } from 'mdx/types'
import { StaticImageData } from "next/image"
import { ReactElement } from 'react'

export type BlogPost = {
	date: string
	title: string
	slug: string
	description: string
	content: (props: MDXProps) => ReactElement
	image?: StaticImageData
}
