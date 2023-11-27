export default async function useGeolocation() {
  const region = await fetch(
    `${process.env.VERCEL_ENV === 'development' ? 'http' : 'https'}://${
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
