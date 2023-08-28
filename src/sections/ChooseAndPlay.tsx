import { css } from '@emotion/react'
import { HandleSelection } from 'components'
import { useOptions } from 'context/optionsContext'
import { FC } from 'react'
import { OptionActionOnKind } from 'reducers/scoreReducerTypes'
import { generateComputerHand } from 'utils/randomNumber'

const ChooseAndPlay: FC = () => {
  const optionsContext = useOptions()
  const { dispatch } = optionsContext

  const HandOptionsArray = optionsContext.options.map((hand, i) => (
    <HandleSelection key={hand.name} name={hand.name} icon={hand.icon} handChoiceIndex={i} />
  ))

  const play = () => {
    const randNumber = generateComputerHand()

    dispatch({ type: OptionActionOnKind.update.UPDATE_COMPUTER_CHOICE, payload: randNumber })
    dispatch({ type: OptionActionOnKind.timer.RUN_TIMER, payload: true })
  }

  return (
    <>
      <div css={SChoiceBtnCtn}>{HandOptionsArray}</div>
      <button type="button" onClick={play} css={SPlayBtn}>
        Play
      </button>
    </>
  )
}

export default ChooseAndPlay

const SChoiceBtnCtn = css`
  display: flex;
  justify-content: center;
  gap: 3.125rem;
`
const SPlayBtn = css`
  color: black;
  background-color: bisque;
  padding: 0.625rem 1.875rem;
  margin-top: 3.125rem;
  font-weight: bold;
`
