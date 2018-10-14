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
    render() {
        const { gifs } = this.props;
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
