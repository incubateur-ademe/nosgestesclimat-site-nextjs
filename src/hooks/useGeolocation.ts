export default async function useGeolocation() {
  const region = await fetch(
    `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${
      process.env.VERCEL_URL
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
