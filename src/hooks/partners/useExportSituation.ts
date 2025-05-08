import { SERVER_URL } from '@/constants/urls/main'
import type { Situation } from '@/publicodes-state/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useExportSituation() {
  const { mutate, mutateAsync, isPending, isSuccess, isError, error, data } =
    useMutation({
      mutationFn: ({
        partner,
        situation,
        partnerParams,
      }: {
        partner: string
        situation: Situation
        partnerParams?: Record<string, string>
      }) => {
        return axios
          .post(
            `${SERVER_URL}/integrations/v1/${partner}/export-situation`,
            { situation: JSON.stringify(situation) },
            {
              params: partnerParams,
            }
          )
          .then((response) => response.data)
      },
    })
  return {
    exportSituation: mutate,
    exportSituationAsync: mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  }
}
