import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { OptionsProvider, useOptions } from 'context/optionsContext'

vi.mock('./initialContextValues', () => ({
  initialState: {
    playerHand: 1,
    computerHand: 2,
    runTimer: false,
    score: {
      player: 0,
      computer: 0,
    },
    results: {
      winner: 'Player 1',
      message: '',
    },
  },
}))

const TestingComponent = () => {
  const optionsContext = useOptions()

  return (
    <>
      <p>PlayerHand: {optionsContext.state.playerHand}</p>
      <p>ComputerHand: {optionsContext.state.computerHand}</p>
      <p>Winner: {optionsContext.state.results.winner} </p>
    </>
  )
}

describe('OptionsContext', () => {
  it('should render the component with the context initial values', () => {
    render(
      <OptionsProvider>
        <TestingComponent />
      </OptionsProvider>
    )

    expect(screen.getByText(/PlayerHand: 1/i)).toBeInTheDocument()
    expect(screen.getByText(/ComputerHand: 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Winner: Player 1/i)).toBeInTheDocument()
  })
})
