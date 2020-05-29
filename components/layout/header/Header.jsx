import React from 'react'
import Link from 'next/link'
import SearchIcon from 'public/static/svg/icon-search.svg'
import { useSnackbar } from 'notistack'
import Container from '../container'
import { useCurrentUser } from '../../../lib/hooks'

const Header = ({ openSearch }) => {
  const [user, { mutate }] = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogout = async () => {
    await fetch('/api/login', {
      method: 'DELETE',
    })

    enqueueSnackbar('Logout successful', { variant: 'success' })
    mutate(null)
  }

  return (
    <header>
      <Container>
        <nav>
          <div className="flex h-24 items-center border-b border-black">
            <div className="flex-initial mr-12">
              <Link href="/">
                <a className="text-2xl tracking-wider font-thin uppercase hover:underline">Blogging</a>
              </Link>
              .
            </div>
            <div className="flex-1">
              <ul className="flex h-full text-xs font-bold tracking-wider uppercase">
                <li>
                  <div className="flex h-full justify-center items-center">
                    <Link href="/topics">
                      <a className="hover:text-gray-700">Topics</a>
                    </Link>
                  </div>
                </li>
                <li className="ml-6">
                  <div className="flex h-full justify-center items-center">
                    <Link href="/">
                      <a className="hover:text-gray-700">About Us</a>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex-initial ml-12 flex justify-end">
              <ul className="flex h-full text-xs font-bold tracking-wider uppercase">
                {!user ? (
                  <>
                    <li>
                      <div className="flex h-full ml-12 flex justify-end">
                        <Link href="/login">
                          <a className="hover:text-gray-700">Sign in</a>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex h-full ml-12 flex justify-end">
                        <Link href="/signup">
                          <a className="hover:text-gray-700">Sign up</a>
                        </Link>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <div className="flex-initial ml-12 flex justify-end">
                        <Link href="/user/[userId]" as={`/user/${user._id}`}>
                          <a className="hover:text-gray-700">Profile</a>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex-initial ml-12 flex justify-end">
                        <a tabIndex={0} role="button" onClick={handleLogout}>
                          Logout
                        </a>
                      </div>
                    </li>
                  </>
                )}
              </ul>
              <div className="cursor-pointer ml-12">
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
