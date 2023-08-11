import { useTranslation } from 'react-i18next'

import { Link, useParams } from 'react-router-dom'
import { blogData } from '../_data/articles'

const MarkdownPageWrapper = () => {
	const { t } = useTranslation()
	const { slug } = useParams()

	const markdownFile = blogData.find((element) => element.slug == slug)
	const Content = markdownFile?.content || ''
	const title = markdownFile?.title
	const description = markdownFile?.description

	console.log('TODO: add meta - BlogArticle')

	if (!markdownFile) {
		return (
			<div>
				<Link to="/blog">← {t('Retour à la liste des articles')}</Link>
				<br />
				{t("Oups, nous n'avons pas d'article correspondant")}
			</div>
		)
	}

	return (
		<div>
			<Link to="/blog">← {t('Retour à la liste des articles')}</Link>
			<Content />
		</div>
	)
}

export default MarkdownPageWrapper
