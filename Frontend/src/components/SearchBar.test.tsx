import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SearchBar } from "./SearchBar"

describe('The SearchBar component', () => {
  it.each(
    [
      'mic'
    ]
  )("should send a request for '%s' when the user types '%s' in the searchbox", async (needle) => {
    const mockQuery = jest.fn()
    const name = 'search-input'

    render(<SearchBar action={mockQuery} name={name} />)

    const searchbox = await screen.findByRole('searchbox')
    
    userEvent.type(searchbox, needle)

    const args = mockQuery.mock.calls.at(0)
    expect(args).toHaveLength(1)
    expect(args[0]).toBeInstanceOf(FormData)
    expect(args[0].get(name)).toEqual(needle)
  })
})