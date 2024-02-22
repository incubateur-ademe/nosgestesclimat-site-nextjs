'use client'

import { useQuizGuard } from '@/hooks/navigation/useQuizGuard'

export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useQuizGuard()

  if (!isGuardInit || isGuardRedirecting) return null

  return <>QUIZZ PAGE</>
}
