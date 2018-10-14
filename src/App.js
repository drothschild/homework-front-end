import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Router } from '@reach/router';
import theme from './styles/Theme';
import Grid from './components/Grid/Grid';
import SearchBox from './components/SearchBox';
import ErrorMessage from './components/ErrorMessage';
import Details from './components/Details';
/*  The majority of the app's logic is contained in this file, and all of React's state. I think the app is sufficiently simple that there's no need to use state management software like redux or context.
 */

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
class App extends Component {
    state = {
        searchTerm: '',
        gifs: [],
        error: null,
        totalCount: 0,
        limit: 20,
        offset: 0
    };
    handleSearchTermChange = async searchTerm => {
        this.setState({ searchTerm });
    };

    render() {
        const { searchTerm, gifs, error, limit } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Inner>
                        {error && <ErrorMessage error={error} />}
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
