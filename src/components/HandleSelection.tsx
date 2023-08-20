import { css } from '@emotion/react'
import { useOptions } from 'context/optionsContext'
import React, { FC, useState } from 'react'
import { OptionActionOnKind } from 'reducers/scoreReducerTypes'

interface Props {
  name: string
  icon: JSX.Element
  handChoiceIndex: number
}

const HandleSelection: FC<Props> = ({ name, icon, handChoiceIndex }) => {
  const [handPressed, setHandPressed] = useState<boolean>(false)
  const optionContext = useOptions()
  const { dispatch, state } = optionContext

  const selectedHandIndex = state.playerHand

  const selectOption = (index: number) => {
    dispatch({ type: OptionActionOnKind.UPDATE_PLAYER_CHOICE, payload: index })
    setHandPressed(true)
  }

  return (
    <>
      <button
        type="button"
        css={[SChoiceBtn, handPressed && handChoiceIndex === selectedHandIndex && SActiveChoice]}
        onClick={() => selectOption(handChoiceIndex)}
      >
        {name}
        {icon}
      </button>
    </>
  )
}

export default HandleSelection

const SChoiceBtn = css`
  color: #1a1a1a;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
`

const SActiveChoice = css`
  background-color: orange;
`
