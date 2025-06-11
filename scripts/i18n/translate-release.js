/*
	Calls the DeepL API to translate the JSON release files.

	Command: yarn translate:release [options]
*/

import cli from '@incubateur-ademe/nosgestesclimat-scripts/cli'
import deepl from '@incubateur-ademe/nosgestesclimat-scripts/deepl'
import chalk from 'chalk'
import fs from 'fs'
import stringify from 'json-stable-stringify'

const c = chalk

const { srcLang, destLangs } = cli.getArgs(
  'Calls the DeepL API to translate the JSON release files.',
  { source: true, target: true }
)

const srcPath = `src/locales/releases/releases-${srcLang}.json`
const getDestPath = (destLang) =>
  `src/locales/releases/releases-${destLang}.json`

const translateTo = async (srcJSON, tradJSON, destPath, destLang) => {
  const alreadyTranslatedReleases = tradJSON.map((release) => {
    return release.name
  })

  await Promise.all(
    srcJSON
      .filter((release) => !alreadyTranslatedReleases.includes(release.name))
      .map(async (release) => {
        const translation = await deepl.fetchTranslationMarkdown(
          release.body,
          srcLang.toUpperCase(),
          destLang.toUpperCase()
        )
        console.log(
          `🌍 Translated release ${c.magenta(release.name)} to ${c.yellow(
            destLang
          )}`
        )
        release.body = translation
        tradJSON.push(release)
      })
  )

  fs.writeFileSync(
    destPath,
    stringify(tradJSON, {
      cmp: (a, b) => a.key.localeCompare(b.key),
      space: 2,
    }),
    { flag: 'w' }
  )
}

const srcJSON = JSON.parse(fs.readFileSync(srcPath, 'utf8'))

destLangs.forEach((destLang) => {
  const destPath = getDestPath(destLang)
  const tradJSON = JSON.parse(fs.readFileSync(destPath, 'utf8')) ?? []
  const numberOfMissingTranslation = srcJSON.length - tradJSON.length

  if (numberOfMissingTranslation === 0) {
    console.log(`🌍 ${c.yellow(destLang)} is already up to date`)
  } else {
    translateTo(srcJSON, tradJSON, destPath, destLang)
  }
})
