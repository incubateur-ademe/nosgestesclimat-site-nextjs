import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command'

Cypress.on('test:before:run', () => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setLocaleOverride',
    params: {
      locale: 'fr-FR',
    },
  })
})

addMatchImageSnapshotCommand()
