window.addEventListener('message', function (e) {
  // Get the sent data

  // There are lots of messages passing
  // console.log("MONLOG", e);
  const data = e.data

  // we need to filter them
  if (data.messageType && data.messageType === 'ngc-iframe-share') {
    console.log('MON RESULTAT DE SIMULATION', data.data)
  }
})
