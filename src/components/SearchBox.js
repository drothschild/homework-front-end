import React, { Component } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';

const Search = styled.div`
    position: relative;
    input {
        width: 100%;
        padding: 1rem;
        border: 1;
        font-size: 2rem;
    }
`;
class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }
    handleSearchTermChange = async e => {
        this.props.handleSearchTermChange(e.target.value);
        // Navigate to grid if not already there.
        if (window.location.pathname !== '/') {
            await navigate('/');
            // Then go back to this search box(and the user will be none the wiser that you ever left it)
            this.searchInput.current.focus();
        }
    };
    render() {
        const { searchTerm } = this.props;
        return (
            <Search>
                <input
                    type="text"
                    name="Search"
                    placeholder="Search for Gifs"
                    value={searchTerm}
                    onChange={this.handleSearchTermChange}
                    onClick={(e) => e.target.select()}
                    ref={this.searchInput}

                />
            </Search>
        );
    }
}

export default SearchBox;
