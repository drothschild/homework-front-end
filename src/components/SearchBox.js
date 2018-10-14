import React, { Component } from 'react';

const SearchBox = ({ handleSearchTermChange, searchTerm }) => (
    <div>
        <input
            type="text"
            name="Search"
            placeholder="Search for Gifs"
            value={searchTerm}
            onChange={event => handleSearchTermChange(event.target.value)}
        />
    </div>
);

export default SearchBox;
