import { defaultNS, fallbackLng, languages } from '@/constants/translation'

export function getOptions(lng = fallbackLng, namespace = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: namespace,
  }
}
