import { DottedName, NodeValue } from '@/publicodes-state/types'

type migrationType = {
  keysToMigrate: Record<DottedName, DottedName>
  valuesToMigrate: Record<DottedName, Record<string, NodeValue>>
}

export const dottedNamesMigration: migrationType = {
  keysToMigrate: {
    'logement . chauffage . bois . type . bûche . consommation':
      'logement . chauffage . bois . type . bûches . consommation',
  },
  valuesToMigrate: {
    'logement . chauffage . bois . type': { "'bûche'": 'bûches' },
    'transport . boulot . commun . type': { "'vélo'": '' },
    'alimentation . petit déjeuner . type': {"'français'": 'continental'}
  },
}
