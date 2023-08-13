import { css } from '@emotion/react'
import React, { FC } from 'react'

interface Props {
  name: string
  icon: JSX.Element
}

const HandleSelection: FC<Props> = ({ name, icon }) => (
  <>
    <button type="button" css={SChoiceBtn}>
      {name}
      {icon}
    </button>
  </>
)

export default HandleSelection

const SChoiceBtn = css`
  color: #1a1a1a;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
`
