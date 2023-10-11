import { useEffect } from 'react'

export function useMagicKey({
  gotToNextQuestion,
  question,
}: {
  gotToNextQuestion: (e: KeyboardEvent) => Promise<void>
  question: any
}) {
  const handleMagicKey = async (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Escape') {
      await gotToNextQuestion(e)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleMagicKey)

    return () => {
      document.removeEventListener('keydown', handleMagicKey)
    }
  }, [question])
}
