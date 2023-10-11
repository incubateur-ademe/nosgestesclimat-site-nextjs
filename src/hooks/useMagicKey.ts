import { useEffect } from 'react'

export function useMagicKey({
  gotToNextQuestion,
}: {
  gotToNextQuestion: (e: KeyboardEvent) => Promise<void>
}) {
  useEffect(() => {
    const handleMagicKey = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'Escape') {
        await gotToNextQuestion(e)
      }
    }
    document.addEventListener('keydown', handleMagicKey)

    return () => {
      document.removeEventListener('keydown', handleMagicKey)
    }
  }, [gotToNextQuestion])
}
