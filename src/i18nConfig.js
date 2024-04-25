const i18nConfig = {
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localeDetector: (request) => {
    const acceptedLanguages = request.headers
      ?.get('accept-language')
      ?.split(',')
    if (!acceptedLanguages) {
      return 'fr'
    }
    const preferedLanguage = acceptedLanguages.find((acceptedLanguage) =>
      ['fr', 'en', 'es'].includes(acceptedLanguage.slice(0, 2))
    )
    return preferedLanguage ?? 'fr'
  },
}

module.exports = i18nConfig
