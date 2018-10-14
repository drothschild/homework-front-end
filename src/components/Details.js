import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Details extends Component {
    state = { loading: true };
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { loading } = this.state;
        const { item } = this.props;
        return (
            <GifGridItemStyles loading={loading}>
                <img
                    className="preview"
                    src={item.images.fixed_width_still.url}
                    alt={item.title}
                />
                <img
                    className="moving"
                    src={item.images.fixed_width.url}
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
