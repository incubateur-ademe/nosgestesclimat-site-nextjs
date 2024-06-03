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
]

module.exports = redirects
