import React, { Component } from 'react';
import axios from 'axios';
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
    state = { gifs: [], limit: 20, searchBox: '' };
    fetchTrending = async () => {
        const { limit } = this.state;
        const data = await axios.get('http://api.giphy.com/v1/gifs/trending', {
            params: {
                api_key: process.env.REACT_APP_GIPHY_API_KEY,
                limit: limit
            }
        });
        const gifs = data.data.data;
        this.setState({ gifs: gifs });
    };
    componentDidMount() {
        this.fetchTrending();
    }
    render() {
        const { gifs } = this.state;
        return (
            <div>
                <h2>Gifs</h2>
                <GifsGrid>
                    {gifs.map(item => {
                        return <GridItem item={item} key
                        ={item.id} />;
                    })}
                </GifsGrid>
            </div>
        );
    }
}
