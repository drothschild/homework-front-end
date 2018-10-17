import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from '@reach/router';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

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
        loadingData: false,
        error: null,
        gif: null
    };

    static propTypes = {
        gifId: PropTypes.string,
        gifs: PropTypes.array
    };

    componentDidMount() {
        const { gifs, gifId } = this.props;
        if (gifs.length) {
            const [gif] = gifs.filter(gif => {
                return gif.id === gifId;
            });
            this.setState({ gif });
        } else {
            this.loadSingleGif();
        }
    }

    loadSingleGif = async () => {
        const url = `https://api.giphy.com/v1/gifs/${this.props.gifId}`;
        this.setState({ loadingData: true, error: null });
        const params = {
            api_key: process.env.REACT_APP_GIPHY_API_KEY
        };
        try {
            const results = await axios.get(url, {
                params
            });
            console.log(results);
            this.setState({ gif: results.data.data, loadingData: false });
        } catch (error) {
            this.setState({ loadingData: false, error });
        }
    };
    render() {
        const { loadingGif, loadingData, gif, error } = this.state;
        if (loadingData) {
            return <Spinner />;
        }
        return (
            <div>
                <Link to={`/`}>Back to gifs</Link>
                {gif && <h2>{gif.title}</h2>}
                <GifDetails loading={loadingGif}>
                    {error && <ErrorMessage error={error} />}
                    {gif && (
                        <>
                            <img
                                className="preview"
                                src={gif.images.original_still.url}
                                alt={gif.title}
                            />
                            <img
                                className="moving"
                                src={gif.images.original.url}
                                alt={gif.title}
                                onLoad={() => {
                                    this.setState({ loadingGif: false });
                                }}
                            />
                            <ul>
                                {gif.caption && <li>caption: {gif.caption}</li>}
                                {gif.source && <li>Source: {gif.source}</li>}
                            </ul>
                        </>
                    )}
                </GifDetails>
            </div>
        );
    }
}
