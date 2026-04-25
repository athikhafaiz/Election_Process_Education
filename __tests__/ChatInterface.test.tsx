import { render, screen, fireEvent } from '@testing-library/react'
import ChatInterface from '@/components/ChatInterface'

describe('ChatInterface', () => {
  it('renders the initial greeting', () => {
    render(<ChatInterface />)
    expect(screen.getByText(/Namaste! I am VoteMitra/i)).toBeInTheDocument()
  })

  it('allows user to type in the input field', () => {
    render(<ChatInterface />)
    const input = screen.getByLabelText('Message input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'How to vote?' } })
    expect(input.value).toBe('How to vote?')
  })

  it('renders persona selector', () => {
    render(<ChatInterface />)
    const selector = screen.getByLabelText('Select Voter Persona')
    expect(selector).toBeInTheDocument()
  })
})
