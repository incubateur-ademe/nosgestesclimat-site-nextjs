export function generateOGImageURL(location: string) {
  return `https://ogimager.osc-fr1.scalingo.io/capture/${encodeURIComponent(
    location
  )}/shareImage?timeout=5000`
}
