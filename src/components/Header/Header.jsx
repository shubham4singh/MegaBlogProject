/*yaha thora optional cheeze hai like when user is not logged in show login and when logged in show log out*/

import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  // auth is name
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 bg-neutral-950 shadow-md backdrop-blur-sm bg-opacity-80'>
      <Container>
        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex ml-auto'>

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 text-neutral-50 text-xl hover:bg-rose-400 hover:scale-110 rounded-full transform transition-all'>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* this means if authStatus is true then the code after && will execute */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

          </ul>
          
        </nav>
      </Container>
    </header>
  )
}

export default Header
