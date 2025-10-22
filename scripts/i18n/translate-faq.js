/*
	Calls the DeepL API to translate the FAQ Yaml files.

	Command: yarn translate:faq -- [options]
*/

import cli from '@incubateur-ademe/nosgestesclimat-scripts/cli'
import deepl from '@incubateur-ademe/nosgestesclimat-scripts/deepl'
import utils from '@incubateur-ademe/nosgestesclimat-scripts/utils'
import c from 'ansi-colors'
import * as paths from './paths.js'

const { srcLang, destLangs, force } = cli.getArgs(
  'Calls the DeepL API to translate the FAQ Yaml files.',
  { source: true, target: true, force: true }
)

const srcPath = paths.FAQ[srcLang].withLock

const translateTo = async (srcYAML, destPath, destLang) => {
  let targetEntries = utils.readYAML(destPath) ?? []

  const getIndexOfId = (id) => {
    return targetEntries.findIndex((entry) => {
      const res = entry.id === id
      return res
    })
  }

  const targetEntryIsUpToDate = (src, target) =>
    target !== undefined &&
    Object.entries(src).every(
      ([key, val]) => key === 'id' || val === target[key + utils.LOCK_KEY_EXT]
    )

  const updateTargetEntries = (newTargetEntry, refId) => {
    const oldTargetEntryIdx = getIndexOfId(refId)
    if (-1 === oldTargetEntryIdx) {
      targetEntries.push(newTargetEntry)
    } else {
      targetEntries[oldTargetEntryIdx] = newTargetEntry
    }
  }

  const missingEntries = srcYAML.filter((refEntry) => {
    const i = getIndexOfId(refEntry.id)
    const isUpToDate = targetEntryIsUpToDate(refEntry, targetEntries[i])

    if (isUpToDate && force) {
      cli.printWarn(
        `Overriding the translation of the question with id: ${refEntry.id}`
      )
      return true
    }
    return !isUpToDate
  })

  if (0 < missingEntries.length) {
    console.log(
      `Found ${c.yellow(missingEntries.length)} missing translations...`
    )
    await Promise.all(
      missingEntries.map(async (refEntry) => {
        const [question, catégorie] = await deepl.fetchTranslation(
          [refEntry.question, refEntry['catégorie']],
          srcLang,
          destLang
        )
        const réponse = await deepl.fetchTranslationMarkdown(
          refEntry['réponse'],
          srcLang,
          destLang
        )
        const targetEntry = {
          id: refEntry.id,
          question,
          catégorie,
          réponse,
        }
        Object.entries(refEntry).forEach(([key, val]) => {
          if (key !== 'id') {
            targetEntry[key + utils.LOCK_KEY_EXT] = val
          }
        })
        updateTargetEntries(targetEntry, refEntry.id)
      })
    )

    utils.writeYAML(destPath, targetEntries)
    console.log(
      `All missing translations succefully written in ${c.yellow(destPath)}`
    )
  } else {
    console.log('Nothing to be done, all translations are up to date!')
  }
}

const srcYAML = utils.readYAML(srcPath)

const run = async () => {
  for (let destLang of destLangs) {
    console.log(
      `Translating the FAQ files from ${c.yellow(srcLang)} to ${c.yellow(
        destLang
      )}...`
    )
    const destPath = paths.FAQ[destLang].withLock
    await translateTo(srcYAML, destPath, destLang)
  }
}

run()
