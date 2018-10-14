import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Router } from '@reach/router';
import theme from './styles/Theme';
import Grid from './components/Grid/Grid';
import SearchBox from './components/SearchBox';
import Details from './components/Details';

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
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
    color: ${theme.black};
  }`;
// Todo: Transfer gifsRequest here.
class App extends Component {
    state = {
        searchTerm: '',
        gifs: [],
        totalCount: 0,
        limit: 60,
        offset: 0,
        max: 300
    };
    handleSearchTermChange = async searchTerm => {
        this.setState({ searchTerm });
    };

    render() {
        const { searchTerm, gifs, limit, max } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Inner>
                        <h2>Gifphy Assignment</h2>
                        <SearchBox
                            searchTerm={searchTerm}
                            handleSearchTermChange={this.handleSearchTermChange}
                        />
                        <Router>
                            <Grid
                                path="/"
                                gifs={gifs}
                                limit={limit}
                                searchTerm={searchTerm}
                                max={max}
                            />
                            <Details path="/gif/:gifId" />
                        </Router>
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default App;
