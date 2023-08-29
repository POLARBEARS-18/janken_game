import React from 'react'
import { ActionTypes } from 'reducers/scoreReducerTypes'

export const HandOption = {
  rock: 'グー',
  paper: 'パー',
  scissors: 'チョキ',
} as const

export interface IOptions {
  name: (typeof HandOption)[keyof typeof HandOption]
  icon: JSX.Element
}

export interface IOptionsContext {
  options: IOptions[]
  state: IInitialState
  dispatch: React.Dispatch<ActionTypes>
}

export interface IProps {
  children: React.ReactNode
}

export interface IResults {
  winner: string
  message: string
}

export interface IScore {
  player: number
  computer: number
}

export interface IInitialState {
  playerHand: number
  computerHand: number
  runTimer: boolean
  score: IScore
  results: IResults
}
