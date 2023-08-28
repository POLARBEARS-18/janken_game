import { css } from '@emotion/react'
import { useOptions } from 'context/optionsContext'
import { useEffect, useState } from 'react'
import { OptionActionOnKind } from 'reducers/scoreReducerTypes'

const ScoreAndResults = () => {
  const [timer, setTimer] = useState<number>(3)

  const optionContext = useOptions()
  const { runTimer } = optionContext.state
  const { dispatch } = optionContext

  useEffect(() => {
    if (runTimer) {
      const newInterValid = setInterval(() => {
        setTimer((prevCount) => {
          if (prevCount === 1) {
            clearInterval(newInterValid)
          }
          return prevCount - 1
        })
      }, 1000)
    }
  }, [runTimer])

  useEffect(() => {
    if (timer === 0) {
      setTimer(3)
      dispatch({ type: OptionActionOnKind.timer.RUN_TIMER, payload: false })
    }
  }, [timer, dispatch])

  return (
    <>
      <div css={SScoreCtn}>
        <div css={SScore}>
          <h3>Score</h3>
          <p>Player</p>
        </div>
        <div css={SScore}>
          <h3>Score</h3>
          <p>Computer</p>
        </div>
      </div>
      <div css={SResults}>
        <div css={SPlayerHand} />
        <div css={SMidCol}>
          {runTimer && (
            <p css={STimer} data-testid="timer">
              {timer}
            </p>
          )}
        </div>
        <div css={SComputerHand} />
      </div>
    </>
  )
}

export default ScoreAndResults

const SScoreCtn = css`
  display: flex;
  justify-content: space-between;

  h3 {
    margin-top: 0;
    padding: 1.25rem 0;
    background-color: #181848;
    color: #fff;
  }
`
const SScore = css`
  width: 12.5rem;
  background-color: #fff;
  margin-bottom: 1.25rem;
`
const SResults = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6.25rem;
  height: 12.5rem;
`
const SPlayerHand = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 0.3125rem;
  position: relative;
`
const SMidCol = css`
  color: #fff;
  max-width: 25rem;
`
const SComputerHand = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 0.3125rem;
  position: relative;
`

const STimer = css`
  color: #fff;
  font-size: 12.5rem;
`
