import { captureException } from '@sentry/nextjs'

const getRulesImport = (fileName: string, ABtesting: boolean) => {
  if (ABtesting) {
    switch (fileName) {
      case 'co2-model.BE-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.BE-lang.en.json'
        )
      case 'co2-model.BE-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.BE-lang.es.json'
        )
      case 'co2-model.BE-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.BE-lang.fr.json'
        )
      case 'co2-model.CA-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CA-lang.en.json'
        )
      case 'co2-model.CA-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CA-lang.es.json'
        )
      case 'co2-model.CA-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CA-lang.fr.json'
        )
      case 'co2-model.CH-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CH-lang.en.json'
        )
      case 'co2-model.CH-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CH-lang.es.json'
        )
      case 'co2-model.CH-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CH-lang.fr.json'
        )
      case 'co2-model.CZ-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CZ-lang.en.json'
        )
      case 'co2-model.CZ-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CZ-lang.es.json'
        )
      case 'co2-model.CZ-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.CZ-lang.fr.json'
        )
      case 'co2-model.DE-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.DE-lang.en.json'
        )
      case 'co2-model.DE-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.DE-lang.es.json'
        )
      case 'co2-model.DE-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.DE-lang.fr.json'
        )
      case 'co2-model.ES-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.ES-lang.en.json'
        )
      case 'co2-model.ES-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.ES-lang.es.json'
        )
      case 'co2-model.ES-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.ES-lang.fr.json'
        )
      case 'co2-model.EU-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.EU-lang.en.json'
        )
      case 'co2-model.EU-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.EU-lang.es.json'
        )
      case 'co2-model.EU-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.EU-lang.fr.json'
        )
      case 'co2-model.FR-lang.en-opti.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.en-opti.json'
        )
      case 'co2-model.FR-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.en.json'
        )
      case 'co2-model.FR-lang.es-opti.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.es-opti.json'
        )
      case 'co2-model.FR-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.es.json'
        )
      case 'co2-model.FR-lang.fr-opti.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.fr-opti.json'
        )
      case 'co2-model.FR-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.fr.json'
        )
      case 'co2-model.GF-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.GF-lang.en.json'
        )
      case 'co2-model.GF-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.GF-lang.es.json'
        )
      case 'co2-model.GF-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.GF-lang.fr.json'
        )
      case 'co2-model.GP-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.GP-lang.en.json'
        )
      case 'co2-model.GP-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.GP-lang.es.json'
        )
      case 'co2-model.GP-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.GP-lang.fr.json'
        )
      case 'co2-model.IT-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.IT-lang.en.json'
        )
      case 'co2-model.IT-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.IT-lang.es.json'
        )
      case 'co2-model.IT-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.IT-lang.fr.json'
        )
      case 'co2-model.LU-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.LU-lang.en.json'
        )
      case 'co2-model.LU-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.LU-lang.es.json'
        )
      case 'co2-model.LU-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.LU-lang.fr.json'
        )
      case 'co2-model.MQ-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.MQ-lang.en.json'
        )
      case 'co2-model.MQ-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.MQ-lang.es.json'
        )
      case 'co2-model.MQ-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.MQ-lang.fr.json'
        )
      case 'co2-model.NC-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.NC-lang.en.json'
        )
      case 'co2-model.NC-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.NC-lang.es.json'
        )
      case 'co2-model.NC-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.NC-lang.fr.json'
        )
      case 'co2-model.PF-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PF-lang.en.json'
        )
      case 'co2-model.PF-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PF-lang.es.json'
        )
      case 'co2-model.PF-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PF-lang.fr.json'
        )
      case 'co2-model.PL-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PL-lang.en.json'
        )
      case 'co2-model.PL-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PL-lang.es.json'
        )
      case 'co2-model.PL-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PL-lang.fr.json'
        )
      case 'co2-model.PT-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PT-lang.en.json'
        )
      case 'co2-model.PT-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PT-lang.es.json'
        )
      case 'co2-model.PT-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.PT-lang.fr.json'
        )
      case 'co2-model.RE-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.RE-lang.en.json'
        )
      case 'co2-model.RE-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.RE-lang.es.json'
        )
      case 'co2-model.RE-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.RE-lang.fr.json'
        )
      case 'co2-model.TN-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.TN-lang.en.json'
        )
      case 'co2-model.TN-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.TN-lang.es.json'
        )
      case 'co2-model.TN-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.TN-lang.fr.json'
        )
      case 'co2-model.TR-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.TR-lang.en.json'
        )
      case 'co2-model.TR-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.TR-lang.es.json'
        )
      case 'co2-model.TR-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.TR-lang.fr.json'
        )
      case 'co2-model.UK-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.UK-lang.en.json'
        )
      case 'co2-model.UK-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.UK-lang.es.json'
        )
      case 'co2-model.UK-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.UK-lang.fr.json'
        )
      case 'co2-model.US-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.US-lang.en.json'
        )
      case 'co2-model.US-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.US-lang.es.json'
        )
      case 'co2-model.US-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.US-lang.fr.json'
        )
      case 'co2-model.YT-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.YT-lang.en.json'
        )
      case 'co2-model.YT-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.YT-lang.es.json'
        )
      case 'co2-model.YT-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat-test/public/co2-model.YT-lang.fr.json'
        )
      default:
        return null
    }
  } else {
    switch (fileName) {
      case 'co2-model.BE-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.BE-lang.en.json'
        )
      case 'co2-model.BE-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.BE-lang.es.json'
        )
      case 'co2-model.BE-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.BE-lang.fr.json'
        )
      case 'co2-model.CA-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CA-lang.en.json'
        )
      case 'co2-model.CA-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CA-lang.es.json'
        )
      case 'co2-model.CA-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CA-lang.fr.json'
        )
      case 'co2-model.CH-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CH-lang.en.json'
        )
      case 'co2-model.CH-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CH-lang.es.json'
        )
      case 'co2-model.CH-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CH-lang.fr.json'
        )
      case 'co2-model.CZ-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CZ-lang.en.json'
        )
      case 'co2-model.CZ-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CZ-lang.es.json'
        )
      case 'co2-model.CZ-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.CZ-lang.fr.json'
        )
      case 'co2-model.DE-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.DE-lang.en.json'
        )
      case 'co2-model.DE-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.DE-lang.es.json'
        )
      case 'co2-model.DE-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.DE-lang.fr.json'
        )
      case 'co2-model.ES-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.ES-lang.en.json'
        )
      case 'co2-model.ES-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.ES-lang.es.json'
        )
      case 'co2-model.ES-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.ES-lang.fr.json'
        )
      case 'co2-model.EU-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.EU-lang.en.json'
        )
      case 'co2-model.EU-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.EU-lang.es.json'
        )
      case 'co2-model.EU-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.EU-lang.fr.json'
        )
      case 'co2-model.FR-lang.en-opti.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.en-opti.json'
        )
      case 'co2-model.FR-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.en.json'
        )
      case 'co2-model.FR-lang.es-opti.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.es-opti.json'
        )
      case 'co2-model.FR-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.es.json'
        )
      case 'co2-model.FR-lang.fr-opti.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
        )
      case 'co2-model.FR-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
        )
      case 'co2-model.GF-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.GF-lang.en.json'
        )
      case 'co2-model.GF-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.GF-lang.es.json'
        )
      case 'co2-model.GF-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.GF-lang.fr.json'
        )
      case 'co2-model.GP-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.GP-lang.en.json'
        )
      case 'co2-model.GP-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.GP-lang.es.json'
        )
      case 'co2-model.GP-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.GP-lang.fr.json'
        )
      case 'co2-model.IT-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.IT-lang.en.json'
        )
      case 'co2-model.IT-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.IT-lang.es.json'
        )
      case 'co2-model.IT-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.IT-lang.fr.json'
        )
      case 'co2-model.LU-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.LU-lang.en.json'
        )
      case 'co2-model.LU-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.LU-lang.es.json'
        )
      case 'co2-model.LU-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.LU-lang.fr.json'
        )
      case 'co2-model.MQ-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.MQ-lang.en.json'
        )
      case 'co2-model.MQ-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.MQ-lang.es.json'
        )
      case 'co2-model.MQ-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.MQ-lang.fr.json'
        )
      case 'co2-model.NC-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.NC-lang.en.json'
        )
      case 'co2-model.NC-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.NC-lang.es.json'
        )
      case 'co2-model.NC-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.NC-lang.fr.json'
        )
      case 'co2-model.PF-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PF-lang.en.json'
        )
      case 'co2-model.PF-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PF-lang.es.json'
        )
      case 'co2-model.PF-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PF-lang.fr.json'
        )
      case 'co2-model.PL-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PL-lang.en.json'
        )
      case 'co2-model.PL-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PL-lang.es.json'
        )
      case 'co2-model.PL-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PL-lang.fr.json'
        )
      case 'co2-model.PT-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PT-lang.en.json'
        )
      case 'co2-model.PT-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PT-lang.es.json'
        )
      case 'co2-model.PT-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.PT-lang.fr.json'
        )
      case 'co2-model.RE-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.RE-lang.en.json'
        )
      case 'co2-model.RE-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.RE-lang.es.json'
        )
      case 'co2-model.RE-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.RE-lang.fr.json'
        )
      case 'co2-model.TN-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.TN-lang.en.json'
        )
      case 'co2-model.TN-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.TN-lang.es.json'
        )
      case 'co2-model.TN-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.TN-lang.fr.json'
        )
      case 'co2-model.TR-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.TR-lang.en.json'
        )
      case 'co2-model.TR-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.TR-lang.es.json'
        )
      case 'co2-model.TR-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.TR-lang.fr.json'
        )
      case 'co2-model.UK-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.UK-lang.en.json'
        )
      case 'co2-model.UK-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.UK-lang.es.json'
        )
      case 'co2-model.UK-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.UK-lang.fr.json'
        )
      case 'co2-model.US-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.US-lang.en.json'
        )
      case 'co2-model.US-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.US-lang.es.json'
        )
      case 'co2-model.US-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.US-lang.fr.json'
        )
      case 'co2-model.YT-lang.en.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.YT-lang.en.json'
        )
      case 'co2-model.YT-lang.es.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.YT-lang.es.json'
        )
      case 'co2-model.YT-lang.fr.json':
        return import(
          '@incubateur-ademe/nosgestesclimat/public/co2-model.YT-lang.fr.json'
        )
      default:
        return null
    }
  }
}

export async function importRulesFromModel({
  fileName,
  ABtesting = false,
}: {
  fileName: string
  ABtesting: boolean
}) {
  try {
    const rulesImport = getRulesImport(fileName, ABtesting)

    if (!rulesImport) {
      throw new Error(`Invalid fileName: ${fileName}`)
    }

    return await rulesImport.then((module) => module.default)
  } catch (e) {
    captureException(e)
    return {}
  }
}
