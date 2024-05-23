import { SERVER_URL } from '@/constants/urls'
import axios from 'axios'
// A previous version of react-query is used here
import { useQuery } from 'react-query'

const idSite = 153

const MESURE_START_DATE = '2021-02-01,today'

export const useX = (queryName, urlQuery, transformResult, keepPreviousData) =>
  useQuery(
    queryName,
    () =>
      axios
        .get(
          SERVER_URL +
            '/get-stats?requestParams=' +
            encodeURIComponent(urlQuery)
        )
        .then((res) => transformResult(res)),
    { keepPreviousData }
  )

export const useChart = ({ chartPeriod, chartDate, method, targets, name }) => {
  return useX(
    `${name}, ${chartPeriod}, ${chartDate}`,
    `module=API&method=${method}&idSite=${idSite}&date=last${chartDate}&period=${chartPeriod}&format=json`,
    (res) => {
      if (targets.length > 0) {
        const targetedData = Object.fromEntries(
          Object.entries(res.data).map(([date, evts]) => {
            return [
              date,
              [
                evts.find((evt) => {
                  return targets.indexOf(evt.label) > -1
                }),
              ],
            ]
          })
        )
        return targetedData
      }

      return res.data
    },
    true
  )
}

export const useSimulationsTerminees = () =>
  useX(
    ['SimulationsTerminees'],
    `module=API&method=Events.getAction&idSite=${idSite}&period=range&date=last6000&format=JSON`,
    (res) =>
      res.data.find(
        (action) =>
          action.label === 'A terminé la simulation' ||
          action.label === 'Simulation Completed'
      ),
    true
  )

export const useTotal = () =>
  useX(
    'total',
    `module=API&date=last30&period=range&format=json&idSite=${idSite}&method=VisitsSummary.getVisits`,
    (res) => res.data
  )

export const useWebsites = () =>
  useX(
    'websites',
    `module=API&date=last30&period=range&format=json&idSite=${idSite}&method=Referrers.getWebsites&filter_limit=1000`,
    (res) => res.data
  )

export const useOldWebsites = () =>
  useX(
    'oldwebsites',
    `module=API&date=lastYear,lastMonth&period=range&format=json&idSite=${idSite}&method=Referrers.getWebsites&filter_limit=1000`,
    (res) => res.data
  )

export const useSocials = () =>
  useX(
    'socials',
    `module=API&date=last30&period=range&format=json&idSite=${idSite}&method=Referrers.getSocials`,

    (res) => res.data
  )

export const useKeywords = () =>
  useX(
    'keywords',
    `module=API&date=last30&period=range&format=json&idSite=${idSite}&method=Referrers.getKeywords`,
    (res) => res.data
  )

export const useEntryPages = () =>
  useX(
    'entryPages',
    `module=API&date=last30&period=range&format=json&idSite=${idSite}&method=Actions.getEntryPageUrls&expanded=1&filter_limit=1000`,
    (res) => res.data
  )

export const useActiveEntryPages = () =>
  useX(
    'activeEntryPages',
    `module=API&date=last30&period=range&format=json&idSite=${idSite}&method=Actions.getEntryPageUrls&filter_limit=1000&segment=eventAction%3D%3DClic%252520CTA%252520accueil`,
    (res) => res.data
  )

export const useAllTime = () =>
  useX(
    'allTime',
    `module=API&date=last6000&period=range&format=json&idSite=${idSite}&method=VisitsSummary.getVisits`,
    (res) => {
      const base = 109689 //base NGC
      res.data.value += base
      return res.data
    }
  )

export const useHomepageVisitors = () =>
  useX(
    'homepageVisitors',
    `module=API&method=Actions.getPageUrl&pageUrl=https://nosgestesclimat.fr&idSite=${idSite}&period=range&date=${MESURE_START_DATE}&format=JSON`,
    (res) => res.data
  )

export const useGetSharedSimulationEvents = () =>
  useX(
    'sharedSimulation',
    `module=API&method=Events.getCategory&label=partage&idSite=${idSite}&period=range&date=${MESURE_START_DATE}&format=JSON`,
    (res) => res.data
  )
