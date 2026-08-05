'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { useCollectiveTestFlow } from './CollectiveTestProvider'

export default function PollNameForm() {
  const { t } = useClientTranslation()
  const { state, send } = useCollectiveTestFlow()

  const [name, setName] = useState(state.pollDraft.name ?? '')
  const [expectedNumberOfParticipants, setExpectedNumberOfParticipants] = useState(
    state.pollDraft.expectedNumberOfParticipants?.toString() ?? ''
  )
  const [nameError, setNameError] = useState<string | undefined>(undefined)
  const [participantsError, setParticipantsError] = useState<
    string | undefined
  >(undefined)

  // Restore the persisted draft once it is hydrated by the provider
  useEffect(() => {
    if (state.pollDraft.name !== undefined) {
      setName(state.pollDraft.name)
    }
    if (state.pollDraft.expectedNumberOfParticipants !== undefined) {
      setExpectedNumberOfParticipants(
        state.pollDraft.expectedNumberOfParticipants.toString()
      )
    }
  }, [state.pollDraft])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      setNameError(
        t('collectiveTest.form.name.required', 'Veuillez renseigner un nom')
      )
      return
    }

    const participants = expectedNumberOfParticipants.trim()

    if (participants !== '' && Number(participants) < 1) {
      setParticipantsError(
        t('Le nombre de participants doit être supérieur à 0')
      )
      return
    }

    send({
      type: 'POLL_NAME_SET',
      name: trimmedName,
      expectedNumberOfParticipants:
        participants === '' ? undefined : Number(participants),
    })
  }

  return (
    <form
      className="flex flex-col gap-8"
      noValidate
      onSubmit={handleSubmit}
      id="poll-form">
      <TextInput
        name="name"
        label={
          <Trans i18nKey="collectiveTest.form.name.label">
            Choisissez un nom pour votre test collectif
          </Trans>
        }
        placeholder={t(
          'collectiveTest.form.name.placeholder',
          'ex : Défi climat équipe RH, Classe 5ème A…'
        )}
        value={name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value)
          setNameError(undefined)
        }}
        error={nameError}
        data-testid="poll-name-input"
      />

      <TextInput
        name="expectedNumberOfParticipants"
        label={
          <p className="mb-0 flex w-full justify-between">
            <span>
              <Trans>Précisez le nombre de participants attendus</Trans>
            </span>
            <span className="text-secondary-700 font-bold">
              <Trans i18nKey="common.facultatif">facultatif</Trans>
            </span>
          </p>
        }
        type="number"
        inputMode="numeric"
        value={expectedNumberOfParticipants}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setExpectedNumberOfParticipants(event.target.value)
          setParticipantsError(undefined)
        }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
          ]
          if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
            event.preventDefault()
          }
        }}
        error={participantsError}
        data-testid="poll-expected-number-of-participants-input"
      />

      <Button
        type="submit"
        data-testid="poll-form-name-button"
        form="poll-form"
        className="self-start">
        <Trans i18nKey="common.suivant">Suivant</Trans>
        <span aria-hidden className="ml-2 inline-block">
          →
        </span>
      </Button>
    </form>
  )
}
