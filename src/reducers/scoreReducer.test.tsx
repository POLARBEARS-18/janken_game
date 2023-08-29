import { render, screen } from '@testing-library/react'
import { FC, useEffect, useReducer } from 'react'
import { describe, it, vi } from 'vitest'
import { initialState } from 'context/initialContextValues'
import scoreReducer from './scoreReducer'
import { ActionTypes, OptionActionOnKind } from './scoreReducerTypes'

vi.mock('context/initialContextValues', () => ({
  initialState: {
    playerHand: 2,
    computerHand: 0,
    runTimer: false,
    score: {
      player: 0,
      computer: 0,
    },
    results: {
      winner: '',
      message: '',
    },
  },
}))

interface IProps {
  myAction: ActionTypes
}

const TestingComponent: FC<IProps> = ({ myAction }) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState)

  useEffect(() => {
    dispatch(myAction)
  }, [myAction])

  return (
    <>
      <p>winner: {state.results.winner}</p>
      <p>winner: {state.results.message}</p>
      <p>playerHand: {state.playerHand}</p>
      <p>computerHand: {state.computerHand}</p>
    </>
  )
}

describe('scoreReducer', () => {
  it('should update the scoreReducer with the correct playerHand', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.UPDATE_PLAYER_CHOICE, payload: 0 }} />)

    expect(screen.getByText(/playerHand: 0/)).toBeInTheDocument()
  })

  it('should update the scoreReducer with the correct computerHand', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.UPDATE_COMPUTER_CHOICE, payload: 1 }} />)

    expect(screen.getByText(/computerHand: 1/)).toBeInTheDocument()
  })

  it('should update the scoreReducer with the player wins', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.PLAYER_WINS, payload: 'Rock beats scissors!' }} />)

    expect(screen.getByText(/winner: Player/i))
    expect(screen.getByText(/Rock beats scissors!/i))
  })

  it('should update the scoreReducer with the computer wins', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.COMPUTER_WINS, payload: 'Scissors beats rock!' }} />)

    expect(screen.getByText(/winner: Computer/i))
    expect(screen.getByText(/Scissors beats rock!/i))
  })

  it('should update the scoreReducer with the draw case', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.DRAW, payload: 'Its a draw' }} />)

    expect(screen.getByText(/winner: No one/i))
    expect(screen.getByText(/Its a draw/i))
  })

  it('should update the scoreReducer with the default case', () => {
    // テストのためにエラーを非表示にする
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    render(<TestingComponent myAction={{ type: OptionActionOnKind.RANDOM, payload: 'Its a draw' }} />)

    expect(screen.getByText(/winner: Error/i))
    expect(screen.getByText(/We have an error/i))
  })
})
