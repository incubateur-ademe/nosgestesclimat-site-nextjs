const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

module.exports = (on, config) => {
  config.env = process.env

  addMatchImageSnapshotPlugin(on, config)
}
