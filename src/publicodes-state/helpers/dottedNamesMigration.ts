type migrationType = {
  key: Record<string, string>
  value: Record<string, Record<string, string>>
}

export const dottedNamesMigration: migrationType = {
  key: {
    'logement . chauffage . bois . type . bûche . consommation':
      'logement . chauffage . bois . type . bûches . consommation',
  },
  value: {
    'logement . chauffage . bois . type': { "'bûche'": 'bûches' },
  },
}
