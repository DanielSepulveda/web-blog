/* eslint-disable react/prop-types */
import React from 'react'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import '../styles/index.css'

const searchClient = algoliasearch('6HPJ3XEDR8', '328e821305d6bd6e4b98d0812d12a42b')

function MyApp({ Component, pageProps }) {
  return (
    <InstantSearch searchClient={searchClient} indexName="test_POSTS">
      <Configure hitsPerPage={6} />
      <Component {...pageProps} />
    </InstantSearch>
  )
}

export default MyApp
