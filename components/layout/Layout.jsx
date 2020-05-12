import React from 'react'
import PropTypes from 'prop-types'
import Head from './Head'
import Header from './header'

const Layout = ({ children }) => {
  return (
    <div>
      <Head />
      <Header />
      <div className="my-12">
        <div className="w-full max-w-full">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
