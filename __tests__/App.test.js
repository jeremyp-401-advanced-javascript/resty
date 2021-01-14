import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../src/App/App'

function pokemonHandler(request, result, context) {
  let output = {
    results: [
      {name: 'foo'},
      {name: 'bar'},
    ]
  }
  return result(context.json(output));
}

const simulatePokemon = jest.fn(pokemonHandler);

const server = setupServer(
  rest.get('*', (request, result, context) => {
    return result(context.json({
      results: [
        {name: 'foo'},
        {name: 'bar'},
      ]
    }))
  })
)

beforeAll(() => server.listen())
afterAll(() => server.resetHandlers())
afterAll(() => server.close())

test('load and display names', async () => {
  render(<App />);
  const pokeButton = screen.getByTestId('poke-button') // Need data-testId='poke-button' on button
  fireEvent.click(pokeButton);
  
  let items = await waitFor(() => screen.getAllByRole('listitem'))
  expect(items[0]).toHaveTextContent('')
})