import React, { FC } from 'react'
import { css } from '@emotion/react'
import { ChooseAndPlay, ScoreAndResults } from 'sections'

const App: FC = () => (
  <div css={SContainer}>
    <div css={STitleCtn}>
      <h1>じゃんけんゲーム</h1>
      <p>React Typescript Game</p>
    </div>
    <ScoreAndResults />
    <ChooseAndPlay />
  </div>
)

export default App

const SContainer = css`
  width: 50em;
`

const STitleCtn = css`
  background-color: #fff;
  border-radius: 0.3125rem;
  padding: 1.25rem 0;
  margin-bottom: 3.125rem;
`
