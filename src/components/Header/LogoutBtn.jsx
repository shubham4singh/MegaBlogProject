import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 text-neutral-50 text-xl hover:bg-rose-400 hover:scale-110 rounded-full transform transition-all'
      onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutBtn
