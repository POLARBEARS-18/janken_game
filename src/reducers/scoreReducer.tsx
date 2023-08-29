import { IInitialState } from 'context/optionsContextTypes'
import { ActionTypes, OptionActionOnKind } from './scoreReducerTypes'

export default function scoreReducer(state: IInitialState, action: ActionTypes) {
  const { type, payload } = action

  switch (type) {
    case OptionActionOnKind.UPDATE_PLAYER_CHOICE:
      return {
        ...state,
        playerHand: payload,
      }
    case OptionActionOnKind.UPDATE_COMPUTER_CHOICE:
      return {
        ...state,
        computerHand: payload,
      }
    case OptionActionOnKind.RUN_TIMER:
      return {
        ...state,
        runTimer: payload,
      }
    case OptionActionOnKind.DRAW:
      return {
        ...state,
        results: {
          winner: 'No one',
          message: payload,
        },
      }
    case OptionActionOnKind.PLAYER_WINS:
      return {
        ...state,
        score: {
          ...state.score,
          player: state.score.player + 1,
        },
        results: {
          winner: 'Player',
          message: payload,
        },
      }
    case OptionActionOnKind.COMPUTER_WINS:
      return {
        ...state,
        score: {
          ...state.score,
          computer: state.score.computer + 1,
        },
        results: {
          winner: 'Computer',
          message: payload,
        },
      }
    default:
      return {
        ...state,
        results: {
          winner: 'error',
          message: 'We have an error',
        },
      }
  }
}
