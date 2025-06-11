/*
	Analyses the source code and extracts the corresponding i18next resource file.

	Command: npm run generate:ui
*/

const fs = require('fs')
const ramda = require('ramda')
const child_process = require('child_process')
const utils = require('@incubateur-ademe/nosgestesclimat-scripts/utils')
const cli = require('@incubateur-ademe/nosgestesclimat-scripts/cli')
const c = require('ansi-colors')

const paths = require('./paths')

const { remove } = cli.getArgs(
  'Analyses the source code and extracts the corresponding i18next resource file.',
  { remove: true }
)

const DEFAULT_VALUE = ''

const printResult = (prefix, array, style) => {
  if (array.length > 0) {
    const entries = array.length > 10 ? array.slice(0, 10) : array

    console.log(prefix, style(array.length), 'translations:')
    entries.sort().forEach((key) => {
      console.log(style(`    ${key}`))
    })
    if (array.length > 10) {
      console.log(style('    ...'))
    }
  }
}

console.log('Static analysis of the source code...')
try {
  if (fs.existsSync(paths.staticAnalysisFrRes)) {
    fs.unlinkSync(paths.staticAnalysisFrRes)
  }
  child_process.execSync(`i18next`)
} catch (error) {
  console.error('ERROR: an error occured during the analysis!', error.message)
  cli.printErr(error.message)
  process.exit(1)
}

if (!fs.existsSync(paths.staticAnalysisFrRes)) {
  cli.printWarn('WARN: the analysis did not produce any result!')
  process.exit(1)
}

const staticAnalysedFrResource = require(paths.staticAnalysisFrRes)
let oldResources = {}
try {
  oldResources = {
    fr: utils.readYAML(paths.UI.fr.withLock).entries,
    en: utils.readYAML(paths.UI.en.withLock).entries,
    es: utils.readYAML(paths.UI.es.withLock).entries,
  }
} catch (error) {
  console.error('Error reading resources:', error.message)
  oldResources = {
    fr: {},
    en: {},
    es: {},
  }
}

console.log('Adding missing entries...')
const translationIsTheKey = (key) => !utils.isI18nKey(key)

if (remove) {
  console.log('Removing unused entries...')
  const currentKeys = Object.keys(
    utils.nestedObjectToDotNotation(staticAnalysedFrResource)
  )

  // Process each language
  Object.entries(oldResources).forEach(([lang, resource]) => {
    const oldKeys = Object.keys(resource)
    const unusedKeys = ramda.difference(oldKeys, currentKeys)

    // Filter out .lock keys that have a corresponding non-lock key in currentKeys
    const keysToKeep = unusedKeys.filter((key) => {
      if (!key.endsWith('.lock')) return false
      const baseKey = key.slice(0, -5) // Remove '.lock'
      return currentKeys.includes(baseKey)
    })

    const finalUnusedKeys = ramda.difference(unusedKeys, keysToKeep)
    oldResources[lang] = ramda.omit(finalUnusedKeys, resource)
    printResult(
      c.green('-') + ` Removed from ${lang}`,
      finalUnusedKeys,
      c.green
    )
    if (keysToKeep.length > 0) {
      printResult(
        c.yellow('~') + ` Kept .lock keys in ${lang}`,
        keysToKeep,
        c.yellow
      )
    }
  })
} else {
  let result = {
    addedTranslations: [],
    missingTranslations: [],
    updatedTranslations: [],
  }
  Object.entries(staticAnalysedFrResource)
    .map(([key, value]) => [
      key,
      value === DEFAULT_VALUE && translationIsTheKey(key) ? key : value,
    ])
    .filter(([key, value]) => oldResources.fr[key] !== value)
    .forEach(([key, value]) => {
      if (!oldResources.fr[key] || value !== DEFAULT_VALUE) {
        if (value === DEFAULT_VALUE) {
          result.missingTranslations.push(key)
        } else if (oldResources.fr[key]) {
          result.updatedTranslations.push(key)
        } else {
          result.addedTranslations.push(key)
        }
        oldResources.fr[key] = value
      }
    })
  printResult(c.green('+') + ' Added', result.addedTranslations, c.green)
  printResult(c.yellow('~') + ' Updated', result.updatedTranslations, c.yellow)
  printResult(c.red('-') + ' Missing', result.missingTranslations, c.red)
}

console.log(`Writing resources...`)
try {
  Object.entries(oldResources).forEach(([lang, resource]) => {
    utils.writeYAML(paths.UI[lang].withLock, { entries: resource })
  })
} catch (error) {
  console.error('ERROR: an error occured while writing!', error.message)
  cli.printErr('ERROR: an error occured while writing!')
  cli.printErr(error.message)
  process.exit(1)
}
