import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { Router } from '@reach/router';
import theme from './styles/Theme';
import Grid from './components/Grid/Grid';
import SearchBox from './components/SearchBox';
import Details from './components/Details';
import { removeDuplicates } from './utils/utils';
const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

const StyledHeader = styled.div`
    background-color: ${props => props.theme.blue};
    display: grid;
    align-items: stretch;
    margin-bottom: 2rem;
    @media (max-width: 1300px) {
        grid-template-columns: 1fr;
        justify-content: center;
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
    text-decoration: none;
    color: ${theme.purple};
  }`;

class App extends Component {
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
        const markedGifs = this.markFavorites(gifs, newFavorites);
        this.setState({ gifs: markedGifs });
    };

    handleGifChange = gifs => {
        const markedGifs = this.markFavorites(removeDuplicates(gifs,"id"), this.state.favorites);
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

export default App;
