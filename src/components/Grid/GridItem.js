import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { GifGridItemStyles } from '../../styles/GifStyles';
import FavoriteStar from '../FavoriteStar';
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
                        console.log(e);
                        changeFavorites(item.id);
                    }}
                />

                <p>{item.title}</p>
            </GifGridItemStyles>
        );
    }
}
