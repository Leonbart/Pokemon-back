import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';

import Loader from '../components/Loader/Loader';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/Card';

describe('Loader component', () => {
  it('Renders Loading Image in Loader Component', () => {
    render(<Loader />);
    const img = screen.getByAltText('Loading');
    expect(img).toBeInTheDocument();
  });
});

describe('Navbar component', () => {
  it('Renders All Links from Navbar Component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const homeLink = screen.getByText('HOME');
    const createLink = screen.getByText('CREATE POKEMON');
    const playLink = screen.getByText('WHO IS THAT POKEMON');

    expect(homeLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
    expect(playLink).toBeInTheDocument();
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
