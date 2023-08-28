import { act, fireEvent, render, screen } from '@testing-library/react'
import { OptionsProvider } from 'context/optionsContext'
import { describe, expect, it } from 'vitest'
import ScoreAndResults from './ScoreAndResults'
import ChooseAndPlay from './ChooseAndPlay'

describe('ScoreAndResults', () => {
  vi.useFakeTimers()
  it('should display 2 seconds on the screen after we wait 1 second second', () => {
    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    )

    const hand = screen.getByText(/チョキ/i)
    expect(hand).toBeInTheDocument()

    fireEvent.click(hand)
    fireEvent.click(screen.getByText('Play'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    screen.debug()

    expect(screen.getByTestId('timer')).toHaveTextContent('2')
  })

  it('should display 2 seconds on the screen after we wait 1 second second', () => {
    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    )

    const hand = screen.getByText(/チョキ/i)
    expect(hand).toBeInTheDocument()

    fireEvent.click(hand)
    fireEvent.click(screen.getByText('Play'))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    screen.debug()

    expect(screen.getByTestId('timer')).toHaveTextContent('1')
  })
})
