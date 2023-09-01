import { Release } from '@/types/translation'

export const sortReleases = (releases: Release[]) =>
  releases
    ?.filter((release) => release.published_at)
    .sort(
      (r1: Release, r2: Release) =>
        -1 * r1.published_at.localeCompare(r2.published_at)
    )
