module.exports = (on, config) => {
  config.env = process.env

  on('task', {
    log(message) {
      console.log(message)
      return null
    },
  })
}
