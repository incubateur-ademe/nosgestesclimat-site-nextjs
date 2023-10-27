describe('The simulation', () => {
  it('Should match previous screenshot "Tutoriel"', () => {
    cy.visit('/tutoriel')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.km"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.voiture.km')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.utilisateur_régulier"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.voiture.utilisateur_régulier'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.gabarit"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.voiture.gabarit')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.motorisation"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.voiture.motorisation'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.saisie_voyageurs"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.voiture.saisie_voyageurs'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.véhicule_récent"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.voiture.véhicule_récent'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.thermique.carburant"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.voiture.thermique.carburant'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.voiture.thermique.consommation_aux_100"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.voiture.thermique.consommation_aux_100'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.avion.usager"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.avion.usager')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.avion.court_courrier.heures_de_vol"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.avion.court_courrier.heures_de_vol'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.avion.moyen_courrier.heures_de_vol"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.avion.moyen_courrier.heures_de_vol'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.avion.long_courrier.heures_de_vol"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.avion.long_courrier.heures_de_vol'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.bus.heures_par_semaine"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.bus.heures_par_semaine'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.deux_roues.usager"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.deux_roues.usager'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.train.km"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.train.km')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.métro_ou_tram.heures_par_semaine"', () => {
    cy.visit(
      '/simulateur/bilan?debug=true&question=transport.métro_ou_tram.heures_par_semaine'
    )
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.ferry.usager"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.ferry.usager')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.mobilité_douce"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.mobilité_douce')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Question transport.vacances"', () => {
    cy.visit('/simulateur/bilan?debug=true&question=transport.vacances')
    cy.wait(4000)
    cy.matchImageSnapshot()
  })
})
