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
} catch (err) {
  cli.printErr('ERROR: an error occured during the analysis!')
  cli.printErr(err.message)
  return
}

if (!fs.existsSync(paths.staticAnalysisFrRes)) {
  cli.printWarn('WARN: the analysis did not produce any result!')
  return
}

const staticAnalysedFrResource = require(paths.staticAnalysisFrRes)
let oldFrResource
try {
  oldFrResource = utils.readYAML(paths.UI.fr.withLock).entries
} catch (err) {
  oldFrResource = {}
}

console.log('Adding missing entries...')
const translationIsTheKey = (key) => !utils.isI18nKey(key)

if (remove) {
  console.log('Removing unused entries...')
  const oldKeys = Object.keys(oldFrResource)
  const currentKeys = Object.keys(
    utils.nestedObjectToDotNotation(staticAnalysedFrResource)
  )
  const unusedKeys = ramda.difference(oldKeys, currentKeys)
  oldFrResource = ramda.omit(unusedKeys, oldFrResource)
  printResult(c.green('-') + ' Removed', unusedKeys, c.green)
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
    .filter(([key, value]) => oldFrResource[key] !== value)
    .forEach(([key, value]) => {
      if (!oldFrResource[key] || value !== DEFAULT_VALUE) {
        if (value === DEFAULT_VALUE) {
          result.missingTranslations.push(key)
        } else if (oldFrResource[key]) {
          result.updatedTranslations.push(key)
        } else {
          result.addedTranslations.push(key)
        }
        oldFrResource[key] = value
      }
    })
  printResult(c.green('+') + ' Added', result.addedTranslations, c.green)
  printResult(c.yellow('~') + ' Updated', result.updatedTranslations, c.yellow)
  printResult(c.red('-') + ' Missing', result.missingTranslations, c.red)
}

console.log(`Writting resources in ${paths.UI.fr.withLock}...`)
try {
  utils.writeYAML(paths.UI.fr.withLock, { entries: oldFrResource })
} catch (err) {
  cli.printErr('ERROR: an error occured while writting!')
  cli.printErr(err.message)
  return
}
