import React from 'react'

const Search = ({handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
  	<input
    type="text"
    onChange={handleChange}
    placeholder="Enter Bitcoin address"
  	/>
	</form>
)

export default Search
