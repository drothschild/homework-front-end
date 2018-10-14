import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import axios from 'axios';
import debounce from 'lodash.debounce';
import theme from './styles/Theme';
import Grid from './components/Grid/Grid';
import SearchBox from './components/SearchBox';
import ErrorMessage from './components/ErrorMessage';
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
        limit: 20
    };
    componentDidMount() {
        console.log('mounted');
        this.fetchGifs();
    }
    handleSearchTermChange = async searchTerm => {
        this.setState({ searchTerm });
        this.fetchGifs();
    };
    fetchGifs = debounce(async () => {
        const { limit, searchTerm } = this.state;
        const url =
            searchTerm.length > 0
                ? 'http://api.giphy.com/v1/gifs/search'
                : 'http://api.giphy.com/v1/gifs/trending';
        const params = {
            api_key: process.env.REACT_APP_GIPHY_API_KEY,
            limit,
            q: searchTerm
        };
        const data = await axios.get(url, {
            params
        });
        const gifs = data.data.data;
        this.setState({ gifs });
    }, 250);

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
                        <Grid gifs={gifs} limit={limit} />
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default App;
