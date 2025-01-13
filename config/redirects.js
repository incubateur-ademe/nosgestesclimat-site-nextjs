const redirects = [
  {
    source: '/actions/liste',
    destination: '/actions',
    permanent: true,
  },
  // Mode Groupe / amis / classement
  {
    source: '/groupes/:path*',
    destination: '/amis/:path*',
    permanent: true,
  },
  {
    source: '/amis',
    destination: '/classements',
    permanent: true,
  },
  {
    source: '/conférence/:path*',
    destination: 'https://sondages.nosgestesclimat.fr/conférence/:path*',
    permanent: true,
  },
  {
    source: '/sondage/:path*',
    destination: 'https://sondages.nosgestesclimat.fr/sondage/:path*',
    permanent: true,
  },
  {
    source: '/mon-empreinte-carbone/:path*',
    destination: '/fin/:path*',
    permanent: true,
  },
  {
    source: '/nouveaut%C3%A9s/Guadeloupe',
    destination: '/nouveautes/guadeloupe',
    permanent: true,
  },
  {
    source: '/nouveaut%C3%A9s/Vatnaj%C3%B6kull',
    destination: '/nouveautes/vatnajokull',
    permanent: true,
  },
  {
    source: '/nouveaut%C3%A9s/:path*',
    destination: '/nouveautes/:path*',
    permanent: true,
  },
  {
    source: '/vie-priv%C3%A9e',
    destination: '/politique-de-confidentialite',
    permanent: true,
  },
  {
    source: '/vie-privee',
    destination: '/politique-de-confidentialite',
    permanent: true,
  },
  {
    source: '/partenaires',
    destination: '/diffuser',
    permanent: true,
  },
  {
    source: '/blog/journée-mondial-environnement',
    destination: '/blog/journee-mondial-environnement',
    permanent: true,
  },
  {
    source: '/mod%C3%A8le',
    destination: '/modele',
    permanent: true,
  },
  {
    source: '/%C3%A0-propos',
    destination: '/a-propos',
    permanent: true,
  },
  {
    source: '/groupe/:path*',
    destination: 'https://sondages.nosgestesclimat.fr/',
    permanent: true,
  },

  {
    source: '/guide/services-soci%C3%A9taux',
    destination: '/guide/services-societaux',
    permanent: true,
  },
  {
    source: '/guide/num%C3%A9rique',
    destination: '/guide/numerique',
    permanent: true,
  },
  {
    source: '/o/:organisation/:poll',
    destination: '/tutoriel/?poll=:poll&organisation=:organisation',
    permanent: true,
  },
  {
    source: '/organisations/:orgaSlug/resultats-detailles',
    destination:
      '/organisations/:orgaSlug/campagnes/campagne-1?isRedirectFromLegacy=true',
    permanent: true,
  },
  {
    source: '/ambassadeurs',
    destination: '/nos-relais',
    permanent: true,
  },
  // Blog v1 > Blog v2
  {
    source: '/blog/empreinte-eau-pourquoi-comment',
    destination:
      '/blog/actualites-et-fonctionnalites/empreinte-eau-pourquoi-comment',
    permanent: true,
  },
  {
    source: '/blog/fonctionnalite-animateurs-ateliers-sensibilisation',
    destination:
      'blog/actualites-et-fonctionnalites/fonctionnalite-animateurs-ateliers-sensibilisation',
    permanent: true,
  },
  {
    source: '/blog/nouveau-parcours-organisations',
    destination:
      '/blog/actualites-et-fonctionnalites/nouveau-parcours-organisations',
    permanent: true,
  },
  {
    source: '/blog/challenge-tes-amis',
    destination: '/blog/actualites-et-fonctionnalites/challenge-tes-amis',
    permanent: true,
  },
  {
    source: '/blog/journee-mondial-environnement',
    destination:
      '/blog/actualites-et-fonctionnalites/journee-mondial-environnement',
    permanent: true,
  },
  {
    source: '/blog/campus',
    destination: '/blog/actualites-et-fonctionnalites/campus',
    permanent: true,
  },
  {
    source: '/blog/historique',
    destination: '/blog/actualites-et-fonctionnalites/historique',
    permanent: true,
  },
  {
    source: '/blog/transports-fuir-transports-cherir',
    destination: 'blog/mobilites/transports-fuir-transports-cherir',
    permanent: true,
  },
  {
    source: '/blog/alternatives-voiture-individuelle',
    destination: '/blog/mobilites/alternatives-voiture-individuelle',
    permanent: true,
  },
  {
    source: '/blog/affichage-ges-transport',
    destination: '/blog/mobilites/affichage-ges-transport',
    permanent: true,
  },
  {
    source: '/blog/impact-mobilite',
    destination: '/blog/mobilites/impact-mobilite',
    permanent: true,
  },
  {
    source: '/blog/lexique-eau-tout-comprendre',
    destination: '/blog/environnement/lexique-eau-tout-comprendre',
    permanent: true,
  },
  {
    source: '/blog/effet-rebond',
    destination: '/blog/environnement/effet-rebond',
    permanent: true,
  },
  {
    source: '/blog/carbone-empreinte-parmi-autres',
    destination: '/blog/environnement/carbone-empreinte-parmi-autres',
    permanent: true,
  },
  {
    source: '/blog/maladaptation',
    destination: '/blog/environnement/maladaptation',
    permanent: true,
  },
  {
    source: '/blog/budget',
    destination: '/blog/environnement/budget',
    permanent: true,
  },
  {
    source: '/empreinte-climat',
    destination: '/blog/environnement/definition-empreinte-carbone',
    permanent: true,
  },
  {
    source: '/blog/reflexes-textile-econome-empreinte-eau',
    destination: '/blog/consommation/reflexes-textile-econome-empreinte-eau',
    permanent: true,
  },
  {
    source: '/blog/demenagement-decarbonation',
    destination: '/blog/logement/demenagement-decarbonation',
    permanent: true,
  },
  {
    source: '/blog/8-facons-ameliorer-empreinte-de-mon-assiette',
    destination:
      '/blog/alimentation/8-facons-ameliorer-empreinte-de-mon-assiette',
    permanent: true,
  },
]

module.exports = redirects
