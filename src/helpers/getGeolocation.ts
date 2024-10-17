import { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  return await axios.get(`/api/geolocation`).then((res) => res.data)
}
