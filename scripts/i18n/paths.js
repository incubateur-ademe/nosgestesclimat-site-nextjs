/*
	Simple module containing all paths implicated to the translation.
*/

const path = require('path')

const utils = require('./utils')

const localesDir = path.resolve('/src/locales')
const rulesTranslation = path.resolve('/src/locales/rules-en.yaml')
const i18nextParserConfig = path.resolve('scripts/i18n/parser.config.js')
const staticAnalysisFrRes = path.resolve('/src/locales/static-analysis-fr.json')
const UI = Object.fromEntries(
  utils.availableLanguages.map((lang) => [
    lang,
    {
      withLock: path.resolve(`/src/locales/ui/ui-${lang}.yaml`),
      withoutLock: path.resolve(`/src/locales/ui/ui-${lang}-min.yaml`),
    },
  ])
)

const FAQ = Object.fromEntries(
  utils.availableLanguages.map((lang) => [
    lang,
    {
      withLock: path.resolve(`/src/locales/faq/FAQ-${lang}.yaml`),
      withoutLock: path.resolve(`/src/locales/faq/FAQ-${lang}-min.yaml`),
    },
  ])
)

module.exports = {
  localesDir,
  rulesTranslation,
  i18nextParserConfig,
  staticAnalysisFrRes,
  UI,
  FAQ,
}
