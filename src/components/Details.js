import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import Spinner from './Grid/Spinner';

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
        const url = `http://api.giphy.com/v1/gifs/${this.props.gifId}`;
        this.setState({ loadingData: true, error: null });
        const params = {
            api_key: process.env.REACT_APP_GIPHY_API_KEY
        };
        try {
            const results = await axios.get(url, {
                params
            });
            this.setState({ item: results.data.data, loadingData: false });
        } catch (error) {
            this.setState({ loadingData: false, error });
        }
    };
    render() {
        const { loadingGif, loadingData, item, error } = this.state;
        if (loadingData) {
            return <Spinner />;
        }
        return (
            <GifDetails loading={loadingGif}>
                {error && <ErrorMessage error={error} />}
                {item && (
                    <>
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
                    </>
                )}
            </GifDetails>
        );
    }
}
