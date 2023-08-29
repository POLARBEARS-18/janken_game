import { act, fireEvent, render, screen } from '@testing-library/react'
import { OptionsProvider } from 'context/optionsContext'
import { describe, expect, it } from 'vitest'
import ScoreAndResults from './ScoreAndResults'
import ChooseAndPlay from './ChooseAndPlay'

vi.mock('utils/randomNumber', () => ({
  generateComputerHand: () => 0,
}))

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

  it('should display the player winner message on the page', () => {
    vi.useFakeTimers()

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    )

    const hand = screen.getByText(/パー/i)
    expect(hand).toBeInTheDocument()

    fireEvent.click(hand)
    fireEvent.click(screen.getByText('Play'))

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    screen.debug()

    expect(screen.getByText('Player wins!')).toBeInTheDocument()
    expect(screen.getByText(/Player wins! Paper beats rock!/i)).toBeInTheDocument()

    expect(screen.getByText(/Player: 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument()

    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible()
    expect(screen.getAllByTestId(/paper/i)[0]).toBeVisible()

    expect(screen.getAllByTestId(/rock/i)).toHaveLength(2)
  })

  it('should display the computer winner message on the page', () => {
    vi.useFakeTimers()

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
      vi.advanceTimersByTime(3000)
    })

    screen.debug()

    expect(screen.getByText('Computer wins!')).toBeInTheDocument()
    expect(screen.getByText(/Computer wins! Scissors beats rock!/i)).toBeInTheDocument()

    expect(screen.getByText(/Player: 0/i)).toBeInTheDocument()
    expect(screen.getByText(/Computer: 1/i)).toBeInTheDocument()

    expect(screen.getAllByTestId(/scissors/i)[0]).toBeVisible()
    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible()

    expect(screen.getAllByTestId(/scissors/i)).toHaveLength(2)
  })

  it('should display the draw message on the page', () => {
    vi.useFakeTimers()

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    )

    const hand = screen.getByText(/グー/i)
    expect(hand).toBeInTheDocument()

    fireEvent.click(hand)
    fireEvent.click(screen.getByText('Play'))

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    screen.debug()

    expect(screen.getByText(/No one/i)).toBeInTheDocument()
    expect(screen.getByText(/We have a draw/i)).toBeInTheDocument()

    expect(screen.getByText(/Player: 0/i)).toBeInTheDocument()
    expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument()

    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible()
    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible()

    expect(screen.getAllByTestId(/rock/i)).toHaveLength(3)
  })
})
