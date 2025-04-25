import { useUser } from '@/publicodes-state'
import { updateGroupParticipant } from '@/services/groups/updateGroupParticipant'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UpdateSimulationUsed from '../UpdateSimulationUsed'

jest.mock('@/services/groups/updateGroupParticipant', () => ({
  updateGroupParticipant: jest.fn(),
}))

jest.mock('@/publicodes-state', () => ({
  useUser: jest.fn(),
}))

const mockRefetchGroup = jest.fn()

const mockSimulation = {
  id: 'simulation-1',
  progression: 1,
  computedResults: {
    carbone: {
      bilan: 4000,
      categories: {} as Record<string, number>,
    },
    eau: {
      bilan: 1000,
      categories: {} as Record<string, number>,
    },
  },
  date: new Date('2024-03-20'),
  situation: {},
  foldedSteps: [],
  actionChoices: {},
  severity: 1,
}

const mockGroupSimulation = {
  id: 'simulation-2',
  progression: 1,
  computedResults: {
    carbone: {
      bilan: 5000,
      categories: {} as Record<string, number>,
    },
    eau: {
      bilan: 1200,
      categories: {} as Record<string, number>,
    },
  },
  date: new Date('2024-03-15'),
  situation: {},
  foldedSteps: [],
  actionChoices: {},
  severity: 1,
}

const mockProps = {
  group: {
    id: 'test-group-id',
    name: 'Test Group',
    emoji: '👥',
    administrator: {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
    },
    severity: 1,
    participants: [
      {
        id: 'participant-1',
        userId: '1',
        name: 'Test User',
        severity: 1,
        simulation: mockGroupSimulation,
      },
    ],
  },
  refetchGroup: mockRefetchGroup,
}

describe('UpdateSimulationUsed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        userId: '1',
        name: 'Test User',
        email: 'test@example.com',
      },
      simulations: [mockSimulation],
    })
  })

  it('should display the update alert when detecting a more recent simulation with a different result', async () => {
    render(<UpdateSimulationUsed {...mockProps} />)

    await waitFor(() => {
      expect(screen.getByTestId('update-alert')).toBeInTheDocument()
    })
  })

  it('should display success alert when update is successful', async () => {
    ;(updateGroupParticipant as jest.Mock).mockResolvedValue({
      data: {
        success: true,
      },
    })

    render(<UpdateSimulationUsed {...mockProps} />)

    const updateButton = screen.getByText('Mettre à jour la simulation')
    await userEvent.click(updateButton)

    await waitFor(() => {
      expect(screen.getByTestId('success-alert')).toBeInTheDocument()
      expect(screen.getByText('Participation mise à jour')).toBeInTheDocument()
    })
  })

  it('should display error alert when update fails', async () => {
    ;(updateGroupParticipant as jest.Mock).mockRejectedValue(
      new Error('Update failed')
    )

    render(<UpdateSimulationUsed {...mockProps} />)

    const updateButton = screen.getByText('Mettre à jour la simulation')
    await userEvent.click(updateButton)

    await waitFor(() => {
      expect(screen.getByTestId('error-alert')).toBeInTheDocument()
      expect(
        screen.getByText("Oups, une erreur s'est produite")
      ).toBeInTheDocument()
    })
  })
})
