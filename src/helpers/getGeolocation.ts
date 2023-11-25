export default async function useGeolocation() {
  const region = await fetch(
    `${process.env.VERCEL_URL === 'development' ? 'https' : 'http'}://${
      process.env.VERCEL_URL || 'localhost:3000'
    }/api/geolocation`
  )
    .then((res) => res.json())
    .then(
      (res: {
        country: {
          code: string
          name: string
        }
      }) => res.country
    )
  return region
}
