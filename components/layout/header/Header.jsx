/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'
import Container from '../container'
import SearchIcon from '../../../assets/svg/icon-search.svg'

const Header = () => {
  return (
    <header>
      <Container>
        <div className="text-center h-24 flex justify-center items-center">
          <h1 className="text-3xl tracking-wider font-thin uppercase">Blogging</h1>
        </div>
      </Container>
      <Container>
        <div className="border-t border-b border-black">
          <div className="flex h-12 px-8">
            <div className="flex-1">
              <ul className="flex h-full text-xs font-bold tracking-wider uppercase">
                <li>
                  <div className="flex h-full justify-center items-center">
                    <Link href="/">
                      <a className="hover:text-gray-700">Home</a>
                    </Link>
                  </div>
                </li>
                <li className="ml-8">
                  <div className="flex h-full justify-center items-center">
                    <Link href="/">
                      <a className="hover:text-gray-700">About Us</a>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              <SearchIcon />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
