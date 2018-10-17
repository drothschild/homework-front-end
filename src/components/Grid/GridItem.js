import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';
import FavoriteStar from '../FavoriteStar';

const GifGridItemStyles = styled.div`
    background: white;
    border: 1px solid ${props => props.theme.gray};
    box-shadow: ${props => props.theme.bs};
    position: relative;
    display: flex;
    flex-direction: column;
    .preview {
        display: ${props => (props.loading ? 'block' : 'none')};
        filter: blur(5px) grayscale(100%);
    }
    .moving {
        display: ${props => (props.loading ? 'none' : 'block')};
    }
    img {
        height: 200px;
        width: 100%;
        object-fit: cover;
    }
    p {
        width: 100%
        line-height: 2;
        font-weight: 300;
        flex-grow: 1;
        padding: 0 3rem;
        font-size: 1.5rem;
    }
`;

export default class GridItem extends Component {
    state = {
        loading: true
    };
    handleClick = e => {
        e.preventDefault();
        this.props.changeFavorites();
    };

    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { item, changeFavorites } = this.props;
        const { loading } = this.state;
        return (
            <GifGridItemStyles loading={loading}>
                <Link to={`/gif/${item.id}`}>
                    <img
                        className="preview"
                        src={item.images.fixed_height_still.url}
                        alt={item.title}
                    />
                    <img
                        className="moving"
                        src={item.images.fixed_height.url}
                        alt={item.title}
                        onLoad={() => {
                            this.setState({ loading: false });
                        }}
                    />
                </Link>
                <FavoriteStar
                    favorite={item.favorite}
                    onClick={e => {
                        e.stopPropagation();
                        changeFavorites(item.id);
                    }}
                />

                <p>{item.title}</p>
            </GifGridItemStyles>
        );
    }
}
