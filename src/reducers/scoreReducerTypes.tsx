export const OptionActionOnKind = {
  update: {
    UPDATE_PLAYER_CHOICE: 'UPDATE_PLAYER_CHOICE',
    UPDATE_COMPUTER_CHOICE: 'UPDATE_COMPUTER_CHOICE',
  },
  timer: {
    RUN_TIMER: 'RUN_TIMER',
  },
} as const

interface UpdateUpdateChoice {
  type: (typeof OptionActionOnKind.update)[keyof typeof OptionActionOnKind.update]
  payload: number
}

interface RunTimer {
  type: (typeof OptionActionOnKind.timer)[keyof typeof OptionActionOnKind.timer]
  payload: boolean
}

export type ActionTypes = UpdateUpdateChoice | RunTimer
