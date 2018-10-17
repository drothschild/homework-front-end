import React, { Component } from 'react';
import styled from 'styled-components';

const StarSVG = styled.svg`
    margin-top: -6rem;
    margin-left: 80%;
    cursor: pointer;
    path {
        fill: ${props => (props.favorite ? props.theme.yellow : 'white')};
    }
`;
export default class FavoriteStar extends Component {
    render() {
        return (
            <StarSVG
                favorite={this.props.favorite}
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 51 48"
                onClick={this.props.onClick}
            >
                <path
                    stroke="#000"
                    d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                />
            </StarSVG>
        );
    }
}
