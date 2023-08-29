export const OptionActionOnKind = {
  UPDATE_PLAYER_CHOICE: 'UPDATE_PLAYER_CHOICE',
  UPDATE_COMPUTER_CHOICE: 'UPDATE_COMPUTER_CHOICE',
  RUN_TIMER: 'RUN_TIMER',
  DRAW: 'DRAW',
  PLAYER_WINS: 'PLAYER_WINS',
  COMPUTER_WINS: 'COMPUTER_WINS',
} as const

type UpdatePlayerChoiceType = typeof OptionActionOnKind.UPDATE_PLAYER_CHOICE
type UpdateComputerChoiceType = typeof OptionActionOnKind.UPDATE_COMPUTER_CHOICE
type TimerType = typeof OptionActionOnKind.RUN_TIMER
type DrawType = typeof OptionActionOnKind.DRAW
type PlayerWinsType = typeof OptionActionOnKind.PLAYER_WINS
type ComputerWinsType = typeof OptionActionOnKind.COMPUTER_WINS

interface UpdatePlayerChoice {
  type: UpdatePlayerChoiceType
  payload: number
}

interface UpdateComputerChoice {
  type: UpdateComputerChoiceType
  payload: number
}

interface RunTimer {
  type: TimerType
  payload: boolean
}

interface Draw {
  type: DrawType
  payload: string
}
interface PlayerWins {
  type: PlayerWinsType
  payload: string
}
interface ComputerWins {
  type: ComputerWinsType
  payload: string
}

export type ActionTypes = UpdatePlayerChoice | UpdateComputerChoice | RunTimer | Draw | PlayerWins | ComputerWins
