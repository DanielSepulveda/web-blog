import React from 'react'
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
                <a className="text-2xl tracking-wider font-thin uppercase">Blogging.</a>
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
                <li>
                  <div className="flex h-full justify-center items-center">
                    <Link href="/login">
                      <a className="hover:text-gray-700">Sign In</a>
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

export default Header
