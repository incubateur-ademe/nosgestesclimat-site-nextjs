import { carboneMetric, eauMetric } from '@/constants/metric'
import { SimulationRecap } from '@/types/organisations'

export function getSimulationRecapAggregatedResult(
  simulationRecaps: SimulationRecap[]
) {
  const result = simulationRecaps.reduce(
    (acc, simulation) => {
      return {
        carbone: {
          bilan:
            acc.carbone.bilan + simulation.computedResults[carboneMetric].bilan,
          transport:
            acc.carbone.transport +
            simulation.computedResults[carboneMetric].categories?.transport,
          logement:
            acc.carbone.logement +
            simulation.computedResults[carboneMetric].categories?.logement,
          alimentation:
            acc.carbone.alimentation +
            simulation.computedResults[carboneMetric].categories?.alimentation,
          divers:
            acc.carbone.divers +
            simulation.computedResults[carboneMetric].categories?.divers,
          'services sociétaux':
            acc.carbone['services sociétaux'] +
            simulation.computedResults[carboneMetric].categories?.[
              'services sociétaux'
            ],
        },
        eau: {
          bilan:
            acc.eau.bilan + (simulation.computedResults[eauMetric]?.bilan ?? 0),
          transport:
            acc.eau.transport +
            (simulation.computedResults[eauMetric]?.categories?.transport ?? 0),
          logement:
            acc.eau.logement +
            (simulation.computedResults[eauMetric]?.categories?.logement ?? 0),
          alimentation:
            acc.eau.alimentation +
            (simulation.computedResults[eauMetric]?.categories?.alimentation ??
              0),
          divers:
            acc.eau.divers +
            (simulation.computedResults[eauMetric]?.categories?.divers ?? 0),
        },
      }
    },
    {
      carbone: {
        bilan: 0,
        transport: 0,
        logement: 0,
        alimentation: 0,
        divers: 0,
        'services sociétaux': 0,
      },
      eau: {
        bilan: 0,
        transport: 0,
        logement: 0,
        alimentation: 0,
        divers: 0,
      },
    }
  )

  Object.keys(result.carbone).forEach((key) => {
    result.carbone[key as keyof typeof result.carbone] =
      result.carbone[key as keyof typeof result.carbone] /
      simulationRecaps.length
  })
  Object.keys(result.eau).forEach((key) => {
    result.eau[key as keyof typeof result.eau] =
      result.eau[key as keyof typeof result.eau] / simulationRecaps.length
  })

  return result
}
