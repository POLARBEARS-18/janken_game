import { initialState } from 'context/initialContextValues'
import { FC, useEffect, useReducer } from 'react'
import scoreReducer from 'reducers/scoreReducer'
import { render, screen } from '@testing-library/react'
import { HandOption } from 'context/optionsContextTypes'
import { checkWinner } from './checkWinner'

vi.mock('context/initialContextValues', () => ({
  initialState: {
    playerHand: 2,
    computerHand: 5,
    runTimer: false,
    score: {
      player: 2,
      computer: 1,
    },
    results: {
      winner: 'Player',
      message: 'abc',
    },
  },
}))

interface IProps {
  playerHand: string
  computerHand: string
}

const TestingComponent: FC<IProps> = ({ playerHand, computerHand }) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState)

  useEffect(() => {
    checkWinner(dispatch, playerHand, computerHand)
  }, [playerHand, computerHand])

  return (
    <>
      <p>playerScore: {state.score.player}</p>
      <p>computerScore: {state.score.computer}</p>
      <p>winner: {state.results.winner}</p>
      <p>message: {state.results.message}</p>
    </>
  )
}

describe('checkWinner', () => {
  it('should update the reducer with the player wins Paper beats rock', () => {
    render(<TestingComponent playerHand={HandOption.paper} computerHand={HandOption.rock} />)

    expect(screen.getByText(/Player wins! Paper beats rock!/i)).toBeInTheDocument()
  })

  it('should update the reducer with the player wins Scissors beats paper', () => {
    render(<TestingComponent playerHand={HandOption.scissors} computerHand={HandOption.paper} />)

    expect(screen.getByText(/Player wins! Scissors beats paper!/i)).toBeInTheDocument()
    expect(screen.getByText(/playerScore: 3/i)).toBeInTheDocument()
    expect(screen.getByText(/computerScore: 1/i)).toBeInTheDocument()
  })

  it('should update the reducer with the player wins  Rock beats scissors', () => {
    render(<TestingComponent playerHand={HandOption.rock} computerHand={HandOption.scissors} />)

    expect(screen.getByText(/Player wins! Rock beats scissors!/i)).toBeInTheDocument()
    expect(screen.getByText(/playerScore: 3/i)).toBeInTheDocument()
    expect(screen.getByText(/computerScore: 1/i)).toBeInTheDocument()
  })

  it('should update the reducer with the player wins  Rock beats scissors', () => {
    render(<TestingComponent playerHand={HandOption.scissors} computerHand={HandOption.rock} />)

    expect(screen.getByText(/Computer wins! Scissors beats rock!/i)).toBeInTheDocument()
    expect(screen.getByText(/playerScore: 2/i)).toBeInTheDocument()
    expect(screen.getByText(/computerScore: 2/i)).toBeInTheDocument()
  })

  it('should update the reducer with a Draw case paper paper', () => {
    render(<TestingComponent playerHand={HandOption.paper} computerHand={HandOption.paper} />)

    expect(screen.getByText(/We have a draw/i)).toBeInTheDocument()
    expect(screen.getByText(/playerScore: 2/i)).toBeInTheDocument()
    expect(screen.getByText(/computerScore: 1/i)).toBeInTheDocument()
  })
})
