import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store/index.js'

import Navbar from '../components/Nav';
import Nav from '../src/components/Nav.jsx';
import Card from '../src/components/Card.jsx';


describe('Navbar component', () => {
  it('Renders All Links from Navbar Component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );

    const aboutLink = screen.getByText('ABOUT');
    const createLink = screen.getByText('NEW POKÉMON');

    expect(aboutLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
  });
});

describe('Card component', () => {
  test('renders card with name and image', () => {
    const name = 'Pikachu';
    const image = 'https://pokeapi.co/api/v2/pokemon/25.png';
    const types = [{ name: 'electric' }];

    render(
      <BrowserRouter>
        <Card name={name} image={image} types={types} />
      </BrowserRouter>
    );

    const nameElement = screen.getByText(name);
    expect(nameElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(name);
    expect(imageElement).toBeInTheDocument();
  });
});
