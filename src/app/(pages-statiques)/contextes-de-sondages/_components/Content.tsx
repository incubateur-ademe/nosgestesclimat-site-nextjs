'use client'

import MDXContent from '@/components/mdx/MDXContent'
import ContentEn from '@/locales/pages/en-us/contextes-sondage.mdx'
import ContentFr from '@/locales/pages/fr/contextes-sondage.mdx'

export default function Content() {
	return <MDXContent contentFr={ContentFr} contentEn={ContentEn} />
}
