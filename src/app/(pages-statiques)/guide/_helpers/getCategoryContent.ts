import guideAlimentation from '../_content/guide-alimentation.mdx'
import guideDivers from '../_content/guide-divers.mdx'
import guideLogement from '../_content/guide-logement.mdx'
import guideNumerique from '../_content/guide-numerique.mdx'
import guideServicesSocietaux from '../_content/guide-services-societaux.mdx'
import guideTransport from '../_content/guide-transport.mdx'

export const getCategoryContent = (category: string) => {
	switch (category) {
		case 'alimentation':
			return guideAlimentation
		case 'divers':
			return guideDivers
		case 'logement':
			return guideLogement
		case 'numerique':
			return guideNumerique
		case 'services-societaux':
			return guideServicesSocietaux
		case 'transport':
			return guideTransport
		default:
			return ''
	}
}
