import { css } from '@emotion/react'
import { useOptions } from 'context/optionsContext'
import { useEffect, useState } from 'react'
import { OptionActionOnKind } from 'reducers/scoreReducerTypes'
import { checkWinner } from 'utils/checkWinner'

const ScoreAndResults = () => {
  const [timer, setTimer] = useState<number>(3)

  const optionContext = useOptions()
  const { runTimer } = optionContext.state
  const { dispatch, options } = optionContext

  const playerHandIndex = optionContext.state.playerHand
  const playerHandName = optionContext.options[playerHandIndex].name
  const playerHandIcon = optionContext.options[playerHandIndex].icon
  const playerScore = optionContext.state.score.player

  const computerHandIndex = optionContext.state.computerHand
  const computerHandName = optionContext.options[computerHandIndex].name
  const computerHandIcon = optionContext.options[computerHandIndex].icon
  const computerScore = optionContext.state.score.computer

  const { winner, message } = optionContext.state.results

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
      dispatch({ type: OptionActionOnKind.RUN_TIMER, payload: false })
      checkWinner(dispatch, playerHandName, computerHandName)
    }
  }, [timer, dispatch, playerHandName, computerHandName])

  return (
    <>
      <div css={SScoreCtn}>
        <div css={SScore}>
          <h3>Score</h3>
          <p>Player: {playerScore}</p>
        </div>
        <div css={SScore}>
          <h3>Score</h3>
          <p>Computer: {computerScore}</p>
        </div>
      </div>
      <div css={SResults}>
        <div css={[SPlayerHand, winner === 'Player' && SWinnerAnimation]}>
          {runTimer && <div css={SPlayerShake}>{options[0].icon}</div>}
          {!runTimer && winner && (
            <>
              <div>{playerHandIcon}</div>
              <p>{playerHandName}</p>
            </>
          )}
        </div>
        <div css={SMidCol}>
          {runTimer && (
            <p css={STimer} data-testid="timer">
              {timer}
            </p>
          )}
          {!runTimer && winner && <p css={SResultWinner}>{winner} wins!</p>}
          {!runTimer && winner && <p css={SResultMessage}>{message}</p>}
        </div>
        <div css={[SComputerHand, winner === 'Computer' && SWinnerAnimation]}>
          {runTimer && <div css={SComputerShake}>{options[0].icon}</div>}
          {!runTimer && winner && (
            <>
              <div>{computerHandIcon}</div>
              <p>{computerHandName}</p>
            </>
          )}
        </div>
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

const SResultWinner = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3.125rem;
`

const SResultMessage = css`
  font-size: 1.5rem;
`

const SPlayerShake = css`
  animation: playerShakeAnimation 0.8s ease-in-out infinite;

  @keyframes playerShakeAnimation {
    0%,
    100% {
      transform: rotate(100deg);
    }
    50% {
      transform: rotate(80deg);
    }
  }
`

const SComputerShake = css`
  animation: computerShakeAnimation 0.8s ease-in-out infinite;

  @keyframes computerShakeAnimation {
    0%,
    100% {
      transform: scaleY(-1) rotate(-80deg);
    }
    50% {
      transform: scaleY(-1) rotate(-100deg);
    }
  }
`
const SWinnerAnimation = css`
  animation: winner 2s ease-in-out;

  @keyframes winner {
    30% {
      transform: scale(1.2);
    }
    40%,
    60% {
      transform: rotate(-20deg) scale(1.1);
    }
    50% {
      transform: rotate(20deg) scale(1.1);
    }
    70% {
      transform: rotate(0deg) scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`
