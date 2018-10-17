import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { Router } from '@reach/router';
import Grid from './Grid/Grid';
import SearchBox from './SearchBox';
import Details from './Details';
import { removeDuplicates } from '../utils/utils';

// I took the colors for the theme from Eaze's website
const theme = {
    blue: '#00aae7',
    red: '#EF6A5A',
    white: '#FFFFFF',
    gray: '#5e5f5f',
    purple: '#5C515A',
    yellow: '#f7ff00',
    black: '#373838',
    maxWidth: '1300px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
    /* display: flex;
    justify-items: start;
    @media (max-width: 1300px) {
        grid-template-columns: 1fr;
        justify-items: center;
    } */
`;

const StyledHeader = styled.div`
    background-color: ${props => props.theme.blue};
    display: grid;
    align-items: start;
    margin-bottom: 2rem;
    @media (max-width: 1300px) {
        grid-template-columns: 1fr;
        align-items: center;
    }
`;

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
    a {
        text-decoration: none;
        color: white;
    }
`;

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    color: ${theme.purple};
  }`;

class GiphyApp extends Component {
    state = {
        searchTerm: '',
        gifs: [],
        favorites: []
    };

    componentDidMount() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites) {
            this.setState({ favorites });
        }
    }

    changeFavorites = gifId => {
        const { favorites, gifs } = this.state;
        let newFavorites = [];
        if (favorites.includes(gifId)) {
            newFavorites = favorites.filter(id => {
                return id !== gifId;
            });
        } else {
            newFavorites = [...favorites, gifId];
        }
        this.setState({
            favorites: newFavorites
        });
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        const markedGifs = this.markFavorites(
            removeDuplicates(gifs, 'id'),
            newFavorites
        );
        this.setState({ gifs: markedGifs });
    };

    handleGifChange = gifs => {
        const markedGifs = this.markFavorites(
            removeDuplicates(gifs, 'id'),
            this.state.favorites
        );
        this.setState({ gifs: markedGifs });
    };
    handleSearchTermChange = searchTerm => {
        this.setState({ searchTerm });
    };

    markFavorites = (gifs, favorites) => {
        if (favorites) {
            const markedGifs = gifs.map(gif => {
                return { ...gif, favorite: favorites.includes(gif.id) };
            });
            return markedGifs;
        } else return gifs;
    };

    render() {
        const { searchTerm, gifs } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <StyledHeader>
                        <Logo>
                            <a href="/">Giphy</a>
                        </Logo>
                        <SearchBox
                            searchTerm={searchTerm}
                            handleSearchTermChange={this.handleSearchTermChange}
                        />
                    </StyledHeader>
                    <Inner>
                        <Router>
                            <Grid
                                path="/"
                                gifs={gifs}
                                handleGifChange={this.handleGifChange}
                                searchTerm={searchTerm}
                                changeFavorites={this.changeFavorites}
                            />
                            <Details path="/gif/:gifId" gifs={gifs} />
                        </Router>
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default GiphyApp;
