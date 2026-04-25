import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatInterface from '@/components/ChatInterface'

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ reply: 'This is a mocked reply from AI' }),
  })
) as jest.Mock;

describe('ChatInterface', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

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

  it('renders persona selector and allows changing persona', () => {
    render(<ChatInterface />)
    const selector = screen.getByLabelText('Select Voter Persona') as HTMLSelectElement
    expect(selector).toBeInTheDocument()
    fireEvent.change(selector, { target: { value: 'nri_voter' } })
    expect(selector.value).toBe('nri_voter')
  })

  it('submits a message and displays loading state and response', async () => {
    render(<ChatInterface />)
    
    const input = screen.getByLabelText('Message input') as HTMLInputElement
    const submitBtn = screen.getByLabelText('Send message')

    // Type message
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    // Submit form
    fireEvent.click(submitBtn)

    // Check if input was cleared and user message is in the list
    expect(input.value).toBe('')
    expect(screen.getByText('Test message')).toBeInTheDocument()

    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ message: 'Test message', persona: 'first_time_voter' })
    }))

    // Wait for the mocked AI response to appear
    await waitFor(() => {
      expect(screen.getByText('This is a mocked reply from AI')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    // Override fetch mock to fail for this test
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
      })
    );

    render(<ChatInterface />)
    
    const input = screen.getByLabelText('Message input') as HTMLInputElement
    const submitBtn = screen.getByLabelText('Send message')

    fireEvent.change(input, { target: { value: 'Trigger error' } })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/Sorry, I encountered an error/i)).toBeInTheDocument()
    })
  })

  it('does not submit empty messages', () => {
    render(<ChatInterface />)
    const submitBtn = screen.getByLabelText('Send message')
    
    // Button should be disabled initially
    expect(submitBtn).toBeDisabled()
    
    // Typing spaces shouldn't enable it
    const input = screen.getByLabelText('Message input') as HTMLInputElement
    fireEvent.change(input, { target: { value: '   ' } })
    
    // It's manually disabled in our code if !input.trim()
    fireEvent.click(submitBtn)
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
