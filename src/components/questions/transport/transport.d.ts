export type HookProps = {
  answers: Record<string, unknown>
  isPristine: boolean
  deleteSituation: (keys: string[]) => void
}
