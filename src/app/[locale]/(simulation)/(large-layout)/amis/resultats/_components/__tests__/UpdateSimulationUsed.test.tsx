import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { screen, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import UpdateSimulationUsed from '../UpdateSimulationUsed'

const mockUpdateGroupParticipant = jest.fn()

jest.mock('@/services/groups/updateGroupParticipant', () => {
  return {
    updateGroupParticipant: () => mockUpdateGroupParticipant(),
  }
})

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
  })

  it('should display the update alert when detecting a more recent simulation with a different result', async () => {
    // When
    renderWithWrapper(<UpdateSimulationUsed {...mockProps} />, {
      user: {
        userId: '1',
        name: 'Test User',
        email: 'test@example.com',
      },
      simulations: [mockGroupSimulation, mockSimulation],
      currentSimulation: mockSimulation,
      providers: {
        user: true,
      },
    })

    // Then
    await waitFor(() => {
      expect(screen.getByTestId('update-alert')).toBeInTheDocument()
    })
  })

  it('should display success alert when update is successful', async () => {
    // Given
    mockUpdateGroupParticipant.mockResolvedValue({
      data: {
        success: true,
      },
    })

    // When
    renderWithWrapper(<UpdateSimulationUsed {...mockProps} />, {
      user: {
        userId: '1',
        name: 'Test User',
        email: 'test@example.com',
      },
      simulations: [mockGroupSimulation, mockSimulation],
      currentSimulation: mockSimulation,
      providers: {
        user: true,
      },
    })
    await userEvent.click(screen.getByTestId('update-button'))

    // Then
    await waitFor(() => {
      expect(screen.getByTestId('success-alert')).toBeInTheDocument()
      expect(screen.getByText('Participation mise à jour')).toBeInTheDocument()
    })
  })

  it('should display error alert when update fails', async () => {
    // Given
    mockUpdateGroupParticipant.mockRejectedValue(new Error('Update failed'))

    // When
    renderWithWrapper(<UpdateSimulationUsed {...mockProps} />, {
      user: {
        userId: '1',
        name: 'Test User',
        email: 'test@example.com',
      },
      simulations: [mockGroupSimulation, mockSimulation],
      currentSimulation: mockSimulation,
      providers: {
        user: true,
      },
    })
    await userEvent.click(screen.getByTestId('update-button'))

    // Then
    await waitFor(() => {
      expect(screen.getByTestId('error-alert')).toBeInTheDocument()
      expect(
        screen.getByText("Oups, une erreur s'est produite")
      ).toBeInTheDocument()
    })

    // And
    await userEvent.click(screen.getByTestId('alert-close'))

    // Then
    await waitFor(() => {
      expect(screen.getByTestId('update-alert')).toBeInTheDocument()
    })
  })
})
