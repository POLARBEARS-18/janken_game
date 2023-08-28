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
      <p>playerHand: {state.playerHand}</p>
      <p>computerHand: {state.computerHand}</p>
    </>
  )
}

describe('scoreReducer', () => {
  it('should update the scoreReducer with the correct playerHand', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.update.UPDATE_PLAYER_CHOICE, payload: 0 }} />)

    expect(screen.getByText(/playerHand: 0/)).toBeInTheDocument()
  })

  it('should update the scoreReducer with the correct computerHand', () => {
    render(<TestingComponent myAction={{ type: OptionActionOnKind.update.UPDATE_COMPUTER_CHOICE, payload: 1 }} />)

    expect(screen.getByText(/computerHand: 1/)).toBeInTheDocument()
  })
})
