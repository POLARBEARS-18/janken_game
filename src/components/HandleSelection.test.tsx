import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FaRegHandPaper } from 'react-icons/fa'
import userEvent from '@testing-library/user-event'
import { OptionsProvider } from 'context/optionsContext'
import HandleSelection from './HandleSelection'

describe('Hand Selection', () => {
  it('should render the hand selection component with the right props', () => {
    render(<HandleSelection name="paper" icon={<FaRegHandPaper data-testid="paper" />} handChoiceIndex={2} />)

    const hand = screen.getByText(/paper/i)
    const icon = screen.getByTestId('paper')

    expect(hand).toBeInTheDocument()
    expect(icon).toBeVisible()
  })

  it('should render the hand selection component with the right props', async () => {
    const user = userEvent.setup()

    render(
      <OptionsProvider>
        <HandleSelection name="paper" icon={<FaRegHandPaper data-testid="paper" />} handChoiceIndex={2} />
      </OptionsProvider>
    )

    const hand = screen.getByText(/paper/i)

    await user.click(hand)

    expect(hand.getAttribute('class')).toContain('activeChoice')
  })
})
