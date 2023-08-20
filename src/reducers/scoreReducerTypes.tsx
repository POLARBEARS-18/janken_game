export const OptionActionOnKind = {
  UPDATE_PLAYER_CHOICE: 'UPDATE_PLAYER_CHOICE',
} as const

interface UpdatePlayerChoice {
  type: (typeof OptionActionOnKind)[keyof typeof OptionActionOnKind]
  payload: number
}

export type ActionTypes = UpdatePlayerChoice
