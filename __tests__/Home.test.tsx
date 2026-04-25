import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the header correctly', () => {
    render(<Home />)
    const headerTitle = screen.getByText('VoteMitra')
    expect(headerTitle).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByText('Demystifying the Election Process')
    expect(heading).toBeInTheDocument()
  })
})
