import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import GridItem from './GridItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const GifsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 30px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
`;
//ToDO: Add props declaration
export default class Grid extends Component {
    state = {
        gifs: [],
        limit: 60,
        offset: 0,
        totalCount: 0,
        loadingData: false,
        error: null
    };
    componentDidMount() {
        this.fetchGifs();
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate(prevProps) {
        // reset the state to blank if the search term has changed
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.setState({ gifs: [], offset: 0 });
            this.fetchGifs();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    fetchGifs = debounce(async () => {
        this.setState({ loadingData: true, error: null });
        const { limit, offset } = this.state;
        const { searchTerm } = this.props;
        // Set url based on presence or absence of search term
        const url =
            searchTerm.length > 0
                ? 'http://api.giphy.com/v1/gifs/search'
                : 'http://api.giphy.com/v1/gifs/trending';
        const params = {
            api_key: process.env.REACT_APP_GIPHY_API_KEY,
            limit,
            q: searchTerm,
            offset
        };
        try {
            const results = await axios.get(url, {
                params
            });
            const gifs = results.data.data;
            const pagination = results.data.pagination;
            this.setState(prevState => ({
                gifs: [...prevState.gifs, ...gifs],
                loadingData: false,
                totalCount: pagination.total_count,
                offset: prevState.offset + limit
            }));
        } catch (error) {
            this.setState({ error, loadingData: false });
        }
    }, 250);

    handleScroll = () => {
        // Why is there a max anyway? To avoid exceeding the Developer API rate limit
        const { loadingData, totalCount, offset, max } = this.state;
        // cancel under these conditions
        if (loadingData || totalCount <= offset || max <= offset) return;
        // If we've near the end of the page, call fetch gifs ()
        if (
            window.innerHeight + document.documentElement.scrollTop + 500 >=
            document.documentElement.offsetHeight
        ) {
            this.fetchGifs();
        }
    };
    render() {
        const { gifs, loadingData, error } = this.state;
        return (
            <div>
                <GifsGrid>
                    {gifs.map(item => {
                        return <GridItem item={item} key={item.id} />;
                    })}
                </GifsGrid>
                {error && <ErrorMessage error={error} />}
                <SpinnerContainer>
                    {loadingData && <Spinner />}
                </SpinnerContainer>
            </div>
        );
    }
}