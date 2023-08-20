import { createContext, useContext, useReducer } from 'react'
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from 'react-icons/fa'
import scoreReducer from 'reducers/scoreReducer'
import { HandOption, IOptions, IProps, IOptionsContext } from './optionsContextTypes'
import { initialState } from './initialContextValues'

const options: IOptions[] = [
  { name: HandOption.rock, icon: <FaRegHandRock size={60} /> },
  { name: HandOption.paper, icon: <FaRegHandPaper size={60} /> },
  { name: HandOption.scissors, icon: <FaRegHandScissors size={60} /> },
]

const OptionsContext = createContext<IOptionsContext>({
  options: [],
  state: initialState,
  dispatch: () => {
    // 仮で追加
    const a = ''
  },
})

export function OptionsProvider(props: IProps) {
  const { children } = props

  const [state, dispatch] = useReducer(scoreReducer, initialState)

  const contextValue = {
    options,
    state,
    dispatch,
  }

  return <OptionsContext.Provider value={contextValue}>{children}</OptionsContext.Provider>
}

export function useOptions() {
  const context = useContext(OptionsContext)
  return context
}