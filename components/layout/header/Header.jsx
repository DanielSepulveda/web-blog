/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import SearchIcon from 'public/static/svg/icon-search.svg'
import Container from '../container'

const Header = ({ openSearch }) => {
  return (
    <header>
      <Container>
        <nav>
          <div className="flex h-24 items-center border-b border-black">
            <div className="flex-initial mr-12">
              <Link href="/">
                <a className="text-2xl tracking-wider font-thin uppercase">Blogging</a>
              </Link>
            </div>
            <div className="flex-1">
              <ul className="flex h-full text-xs font-bold tracking-wider uppercase">
                <li>
                  <div className="flex h-full justify-center items-center">
                    <Link href="/">
                      <a className="hover:text-gray-700">About Us</a>
                    </Link>
                  </div>
                </li>
                {/* <li className="ml-8">
                  <div className="flex h-full justify-center items-center">
                    <Link href="/">
                      <a className="hover:text-gray-700">About Us</a>
                    </Link>
                  </div>
                </li> */}
              </ul>
            </div>
            <div className="flex-initial ml-12 flex justify-end">
              <div className="cursor-pointer">
                <img src={SearchIcon} alt="Search Icon" onClick={openSearch} />
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

Header.propTypes = {
  openSearch: PropTypes.func.isRequired,
}

export default Header
