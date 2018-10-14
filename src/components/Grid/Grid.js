import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import GridItem from './GridItem';

const GifsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 60px;
    max-width: 1000px;
    margin: 0 auto;
`;
export default class Grid extends Component {
    state = {
        gifs: [],
        totalCount: 0,
        limit: 20,
        offset: 0,
        loadingdata: false
    };
    componentDidMount() {
        this.fetchGifs();
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            // Either remove or implement Loading Data
            this.setState({ gifs: [], offset: 0 });
            this.fetchGifs();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    fetchGifs = debounce(async () => {
        this.setState({ loadingData: true });
        const { limit, offset } = this.state;
        console.log('loading next', offset);
        const { searchTerm } = this.props;
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
    }, 250);
    handleScroll = () => {
        const { loadingData, totalCount, offset } = this.state;
        if (loadingData || totalCount <= offset) return;

        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            this.fetchGifs();
        }
    };
    render() {
        const { gifs } = this.state;
        return (
            <div>
                <h2>Gifs</h2>
                <GifsGrid>
                    {gifs.map(item => {
                        return <GridItem item={item} key={item.id} />;
                    })}
                </GifsGrid>
            </div>
        );
    }
}
