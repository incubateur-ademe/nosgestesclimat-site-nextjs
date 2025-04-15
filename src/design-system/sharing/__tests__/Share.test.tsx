import WhatsappIcon from '@/components/icons/share/WhatsappIcon'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Share from '../Share'

const mockProps = {
  buttonLabel: t('Partager'),
  shareItems: [
    {
      label: t('Whatsapp'),
      link: 'https://api.whatsapp.com/send?text=totococo',
      icon: <WhatsappIcon />,
      eventTracked: ['toto'],
    },
  ],
  modalTitle: t('Partager le simulateur'),
  modalDescription: t(
    'Envoyez le simulateur à vos proches et faites votre 1ère bonne action !'
  ),
  link: 'test',
}

describe('Share component', () => {
  it('should display a share button', () => {
    // Given
    render(<Share {...mockProps} />)

    // Then
    expect(screen.getByTestId('share-button'))
  })

  it('should display a modal window upon click on the share button', async () => {
    // Given
    render(<Share {...mockProps} ariaHideApp={false} />)

    // When
    await userEvent.click(screen.getByTestId('share-button'))

    // Then
    expect(screen.getByTestId('modal-element'))
  })
})
