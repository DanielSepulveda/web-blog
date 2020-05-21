/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import closeIcon from 'public/static/svg/icon-x.svg'
import { SearchBox, Hits } from 'react-instantsearch-dom'
import Container from './container'
import Head from './Head'
import Header from './header'
import HitsCard from '../algolia/HitsCard'
import Results from '../algolia/Results'
import Info from '../algolia/Info'

const Layout = ({ children }) => {
  const [search, setSearch] = React.useState(false)

  const openSearch = () => {
    // eslint-disable-next-line no-undef
    document.querySelector('body').classList.add('search-open')
    setSearch(true)
  }

  const closeSearch = () => {
    // eslint-disable-next-line no-undef
    document.querySelector('body').classList.remove('search-open')
    setSearch(false)
  }

  return (
    <div>
      <Head />
      <Header openSearch={openSearch} />
      <div className="my-12">
        <div className="w-full max-w-full">
          <main>{children}</main>
        </div>
      </div>
      <div
        className={cs('site-search fixed inset-0 z-50 bg-white overflow-auto', {
          hidden: !search,
        })}
      >
        <div className="absolute top-0 right-0 flex flex-col items-center mt-4 mr-4 text-sm z-50">
          <div className="cursor-pointer">
            <img src={closeIcon} alt="Close Icon" onClick={closeSearch} />
          </div>
          {/* <span className="text-sm">(Esc)</span> */}
        </div>
        <div className="search-container overflow-auto">
          <Container>
            <SearchBox />
            <Info />
            <div className="search-results mt-4">
              <Results>
                <Hits hitComponent={HitsCard} />
              </Results>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
