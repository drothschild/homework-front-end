import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GifGridItemStyles } from '../../styles/GifStyles';

export default class GridItem extends Component {
    state = { loading: true };
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { item } = this.props;
        const { loading } = this.state;
        return (
            <GifGridItemStyles loading={loading}>
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

                <p>{item.title}</p>
            </GifGridItemStyles>
        );
    }
}
