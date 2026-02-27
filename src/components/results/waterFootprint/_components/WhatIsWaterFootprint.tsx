import Trans from '@/components/translation/trans/TransServer'
import InlineLink from '@/design-system/inputs/InlineLink'
import Emoji from '@/design-system/utils/Emoji'
import { getRules } from '@/helpers/modelFetching/getRules'
import type { Locale } from '@/i18nConfig'
import type { Situation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'
import DomesticWaterBlock from './DomesticWaterBlock'

interface Props {
  locale: Locale
  situation: Situation
}

const getDomesticWaterValue = async ({ locale, situation }: Props) => {
  const rules = await getRules({ locale })

  const engine = new Engine<DottedName>(rules, {
    strict: {
      situation: false,
      noOrphanRule: false,
      checkPossibleValues: false,
      noCycleRuntime: false,
    },
    warn: {
      cyclicReferences: false,
      situationIssues: false,
    },
  })

  engine.setSituation(situation)

  const evaluation = engine.evaluate({
    valeur: 'logement . eau domestique',
    contexte: {
      métrique: "'eau'",
    },
  })

  return typeof evaluation.nodeValue === 'number' ? evaluation.nodeValue : 149
}

export default async function WhatIsWaterFootprint({
  locale,
  situation,
}: Props) {
  const domesticWaterValue = await getDomesticWaterValue({ locale, situation })

  return (
    <div className="mb-12 flex flex-col gap-8 md:flex-row">
      <section className="bg-primary-50 flex-1 p-8">
        <h2 className="title-lg">
          <Trans
            i18nKey="simulation.eau.whatIsWaterFootprint.title"
            locale={locale}>
            L'empreinte eau, c'est quoi ?
          </Trans>
        </h2>
        <p>
          <Trans
            i18nKey="simulation.eau.whatIsWaterFootprint.description"
            locale={locale}>
            L'empreinte eau, c'est{' '}
            <strong>l'ensemble de l'eau consommée</strong> pour{' '}
            <strong>produire</strong>
            et <strong>distribuer</strong> les biens et services de votre
            quotidien. Par exemple il faut de l'eau pour :
          </Trans>
        </p>
        <ul className="mb-4">
          <li className="mb-1 flex items-center gap-3">
            <Emoji className="text-3xl">🍅</Emoji>
            <span className="flex-1">
              <Trans
                i18nKey="simulation.eau.whatIsWaterFootprint.list.fruitsAndVegetables"
                locale={locale}>
                les <strong>fruits, légumes</strong> et{' '}
                <strong>céréales</strong> que vous mangez
              </Trans>
            </span>
          </li>
          <li className="mb-1 flex items-center gap-3">
            <Emoji className="text-3xl">👕</Emoji>
            <span className="flex-1">
              <Trans
                i18nKey="simulation.eau.whatIsWaterFootprint.list.cotton"
                locale={locale}>
                la culture du <strong>coton</strong> que vous portez
              </Trans>
            </span>
          </li>
          <li className="mb-1 flex items-center gap-3">
            <Emoji className="text-3xl">🐮</Emoji>
            <span className="flex-1">
              <Trans
                i18nKey="simulation.eau.whatIsWaterFootprint.list.animals"
                locale={locale}>
                l'alimentation des <strong>animaux</strong> que vous consommez
              </Trans>
            </span>
          </li>
          <li className="mb-1 flex items-center gap-3">
            <Emoji className="text-3xl">📱</Emoji>
            <span className="flex-1">
              <Trans
                i18nKey="simulation.eau.whatIsWaterFootprint.list.digitalDevices"
                locale={locale}>
                l'extraction des matériaux de vos{' '}
                <strong>appareils numériques</strong>
              </Trans>
            </span>
          </li>
          <li className="mb-1 flex items-center gap-3">
            <Emoji className="text-3xl">⚡️</Emoji>
            <span className="flex-1">
              <Trans
                i18nKey="simulation.eau.whatIsWaterFootprint.list.electricity"
                locale={locale}>
                la production de votre <strong>électricité</strong>
              </Trans>
            </span>
          </li>
          <li className="mb-1 flex items-center gap-3">
            <Emoji className="text-3xl">🚫</Emoji>
            <span className="flex-1">
              <Trans
                i18nKey="simulation.eau.whatIsWaterFootprint.list.domesticWater"
                locale={locale}>
                <strong>attention</strong> : l'eau domestique (par exemple l'eau
                de vos douches) ne fait pas partie de l'empreinte eau
              </Trans>
            </span>
          </li>
        </ul>
      </section>

      <section className="bg-secondary-50 flex-1 p-8">
        <h2 className="title-lg">
          <Trans
            i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.title"
            locale={locale}>
            Et l'eau de ma douche dans tout ça ?
          </Trans>
        </h2>
        <p>
          <Trans
            i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.description1"
            locale={locale}>
            L’eau domestique, à savoir, celle qui sort de vos robinets n'est pas
            comprise dans votre empreinte eau, puisqu’elle est restituée. Par
            exemple, l’eau de votre douche, après dépollution, est rendue aux
            cours d’eau de votre territoire.
          </Trans>
        </p>

        <DomesticWaterBlock
          locale={locale}
          domesticWaterValue={domesticWaterValue}
        />

        <p>
          <Trans
            i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.description2"
            locale={locale}>
            L’eau domestique peut avoir <strong>un impact très fort</strong>{' '}
            selon la <strong>saison</strong> et la <strong>localisation</strong>
            .
          </Trans>
        </p>

        <div>
          <InlineLink href="https://vigieau.gouv.fr/">
            <Trans
              i18nKey="simulation.eau.whatIsWaterFootprint.vigieEau"
              locale={locale}>
              Rendez-vous sur VigiEau pour en savoir plus.
            </Trans>
          </InlineLink>
        </div>
      </section>
    </div>
  )
}
