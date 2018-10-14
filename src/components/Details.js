import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const GifDetails = styled.div`
    background: white;
    border: 1px solid ${props => props.theme.gray};
    box-shadow: ${props => props.theme.bs};
    position: relative;
    display: flex;
    flex-direction: column;
    .preview {
        display: ${props => (props.loading ? 'block' : 'none')};
        filter: grayscale(100%);
    }
    .moving {
        display: ${props => (props.loading ? 'none' : 'block')};
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    p {
        line-height: 2;
        font-weight: 300;
        flex-grow: 1;
        padding: 0 3rem;
        font-size: 1.5rem;
    }
`;

export default class Details extends Component {
    state = {
        loadingGif: true,
        loadingData: true,
        error: null,
        item: null
    };

    static propTypes = {
        gifId: PropTypes.string,
        item: PropTypes.object
    };

    componentDidMount() {
        if (!this.props.item) {
            this.search();
        } else {
            this.setState({ item: this.props.item });
        }
    }

    search = async () => {
        console.log(this.props.gifId);

        const url = `http://api.giphy.com/v1/gifs/${this.props.gifId}`;

        const params = {
            api_key: process.env.REACT_APP_GIPHY_API_KEY
        };
        this.setState({ loadingData: true });

        const results = await axios.get(url, {
            params
        });
        // const item = data.data.data;
        this.setState({ item: results.data.data, loadingData: false });
    };
    render() {
        const { loadingGif, loadingData, item } = this.state;
        if (loadingData) {
            return <div>Loading...</div>;
        }
        console.log(item);
        return (
            <GifDetails loading={loadingGif}>
                <img
                    className="preview"
                    src={item.images.original_still.url}
                    alt={item.title}
                />
                <img
                    className="moving"
                    src={item.images.original.url}
                    alt={item.title}
                    onLoad={() => {
                        this.setState({ loadingGif: false });
                    }}
                />

                <p>{item.title}</p>
                <p>caption: {item.caption}</p>
            </GifDetails>
        );
    }
}
