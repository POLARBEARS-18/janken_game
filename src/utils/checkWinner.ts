import { HandOption } from 'context/optionsContextTypes'
import { Dispatch } from 'react'
import { ActionTypes, OptionActionOnKind } from 'reducers/scoreReducerTypes'

export const checkWinner = (dispatch: Dispatch<ActionTypes>, playerHandName: string, computerHandName: string) => {
  // プレイヤーがグーの場合
  if (playerHandName === HandOption.rock && computerHandName === HandOption.rock) {
    dispatch({ type: OptionActionOnKind.DRAW, payload: 'We have a draw' })
  } else if (playerHandName === HandOption.rock && computerHandName === HandOption.paper) {
    dispatch({ type: OptionActionOnKind.COMPUTER_WINS, payload: 'Computer wins! Paper beats rock!' })
  } else if (playerHandName === HandOption.rock && computerHandName === HandOption.scissors) {
    dispatch({ type: OptionActionOnKind.PLAYER_WINS, payload: 'Player wins! Rock beats scissors!' })
  }

  // プレイヤーがパーの場合
  if (playerHandName === HandOption.paper && computerHandName === HandOption.rock) {
    dispatch({ type: OptionActionOnKind.PLAYER_WINS, payload: 'Player wins! Paper beats rock!' })
  } else if (playerHandName === HandOption.paper && computerHandName === HandOption.paper) {
    dispatch({ type: OptionActionOnKind.DRAW, payload: 'We have a draw' })
  } else if (playerHandName === HandOption.paper && computerHandName === HandOption.scissors) {
    dispatch({ type: OptionActionOnKind.COMPUTER_WINS, payload: 'Computer wins! Paper beats scissors!' })
  }

  // プレイヤーがチョキの場合
  if (playerHandName === HandOption.scissors && computerHandName === HandOption.rock) {
    dispatch({ type: OptionActionOnKind.COMPUTER_WINS, payload: 'Computer wins! Scissors beats rock!' })
  } else if (playerHandName === HandOption.scissors && computerHandName === HandOption.paper) {
    dispatch({ type: OptionActionOnKind.PLAYER_WINS, payload: 'Player wins! Scissors beats paper!' })
  } else if (playerHandName === HandOption.scissors && computerHandName === HandOption.scissors) {
    dispatch({ type: OptionActionOnKind.DRAW, payload: 'We have a draw' })
  }
}
