import React from 'react'
import { connectStateResults } from 'react-instantsearch-dom'

const Results = ({ searchState, searchResults, children }) => {
  if (!searchState || !searchState.query) {
    return React.Fragment
  }

  if (!searchResults || !searchResults.nbHits) {
    return <div>no results</div>
  }

  return <div className="mb-8">{children}</div>
}

export default connectStateResults(Results)
