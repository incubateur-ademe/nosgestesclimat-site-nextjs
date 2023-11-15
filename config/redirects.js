const redirects = [
  {
    source: '/actions/liste',
    destination: '/actions',
    permanent: true,
  },
  {
    source: '/groupes/:path*',
    destination: '/amis/:path*',
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
    source: '/nouveaut%C3%A9s/:path**',
    destination: '/nouveautes/:path**',
    permanent: true,
  },
  {
    source: '/vie-priv%C3%A9e',
    destination: '/vie-privee',
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
    source: '/à-propos',
    destination: '/a-propos',
    permanent: true,
  },
  {
    source: '/groupe/:path*',
    destination: 'https://sondages.nosgestesclimat.fr/',
    permanent: true,
  },
]

module.exports = redirects
