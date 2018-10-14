import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import theme from './styles/Theme';
import Grid from './components/Grid/Grid';

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
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Inner>
                        <SearchBox />
                        <Grid />
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default App;
