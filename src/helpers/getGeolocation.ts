export async function getGeolocation(): Promise<string> {
  const regionCode = await fetch(
    `${
      process.env.VERCEL_ENV === 'preview' ||
      process.env.VERCEL_ENV === 'production'
        ? 'https'
        : 'http'
    }://${process.env.VERCEL_URL || 'localhost:3000'}/api/geolocation`
  )
    .then((res) => res.json())
    .then((res) => res.country?.code ?? 'FR')

  return regionCode
}
