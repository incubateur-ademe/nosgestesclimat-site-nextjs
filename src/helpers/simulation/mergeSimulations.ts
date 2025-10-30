import type { Simulation } from '@/publicodes-state/types'
import { v4 as uuid } from 'uuid'

type MergeResult = {
  mergedSimulations: Simulation[]
  currentSimulationId: string
  simulationsToSync: Simulation[]
}

type Options = {
  localCurrentSimulationId?: string
}

const toTimestamp = (date?: string | Date) =>
  date ? new Date(date).getTime() : 0

function ensureId(simulation: Simulation): Simulation {
  if (!simulation.id) {
    return { ...simulation, id: uuid() }
  }
  return simulation
}

function pickWinner(a: Simulation, b: Simulation): 'a' | 'b' {
  const ta = toTimestamp(a.date)
  const tb = toTimestamp(b.date)
  return ta >= tb ? 'a' : 'b'
}

function shallowMergeByWinner(
  winner: Simulation,
  loser: Simulation
): Simulation {
  // Winner precedence; keep loser fields that are missing in winner for stability
  return {
    ...loser,
    ...winner,
    // Prefer server meta if winner lacks them
    computedResults: winner.computedResults || loser.computedResults,
    polls: winner.polls || loser.polls,
    groups: (winner as any).groups || (loser as any).groups,
  }
}

export function mergeSimulations(
  serverSimulations: Simulation[] = [],
  localSimulations: Simulation[] = [],
  { localCurrentSimulationId }: Options = {}
): MergeResult {
  const serverById = new Map<string, Simulation>()
  const localById = new Map<string, Simulation>()

  for (const s of serverSimulations) {
    const withId = ensureId(s)
    serverById.set(withId.id, withId)
  }
  for (const s of localSimulations) {
    const withId = ensureId(s)
    localById.set(withId.id, withId)
  }

  const allIds = new Set<string>([...serverById.keys(), ...localById.keys()])
  const merged: Simulation[] = []
  const simulationsToSync: Simulation[] = []

  for (const id of allIds) {
    const server = serverById.get(id)
    const local = localById.get(id)

    if (server && local) {
      const winnerKey = pickWinner(server, local)
      const winner = winnerKey === 'a' ? server : local
      const loser = winnerKey === 'a' ? local : server
      const mergedItem = shallowMergeByWinner(winner, loser)
      merged.push(mergedItem)

      // If local won, we need to push to server later
      if (winnerKey === 'b') {
        simulationsToSync.push(mergedItem)
      }
    } else if (server) {
      merged.push(server)
      // No sync needed, server-only
    } else if (local) {
      merged.push(local)
      simulationsToSync.push(local)
    }
  }

  // Sort by date desc for determinism
  merged.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))

  // Determine currentSimulationId
  let currentSimulationId = ''
  if (
    localCurrentSimulationId &&
    merged.some((s) => s.id === localCurrentSimulationId)
  ) {
    currentSimulationId = localCurrentSimulationId
  } else if (merged[0]?.id) {
    currentSimulationId = merged[0].id
  }

  return { mergedSimulations: merged, currentSimulationId, simulationsToSync }
}
