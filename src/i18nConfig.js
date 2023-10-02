const i18nConfig = {
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localeDetector: (request) => {
    const acceptedLanguages = request.headers
      ?.get('accept-language')
      ?.split(',')
    if (!acceptedLanguages) {
      return 'fr'
    }
    const preferedLanguage = acceptedLanguages.find((acceptedLanguage) =>
      ['fr', 'en'].includes(acceptedLanguage.split('-'))
    )
    return preferedLanguage || 'fr'
  },
}

module.exports = i18nConfig
