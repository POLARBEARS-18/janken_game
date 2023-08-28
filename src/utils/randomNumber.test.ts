import { describe, it } from 'vitest'
import { generateComputerHand } from './randomNumber'

describe('randomNumber', () => {
  it('should create a random number', () => {
    const randomNumber = generateComputerHand()

    expect(randomNumber).toBeLessThanOrEqual(2)
    expect(randomNumber).toBeGreaterThanOrEqual(0)
  })
})
