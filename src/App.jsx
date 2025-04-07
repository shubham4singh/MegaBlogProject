import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header } from "./components"
import { Footer } from "./components"
import { Outlet } from 'react-router-dom'

// added by me
import { ThreeDot } from "react-loading-indicators";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("App.jsx, userData exists so login dispatch");
          dispatch(login({ userData }))
        } else {
          console.log("App.jsx, userData not exists so logout disptach");
          dispatch(logout())
        }
      })
      // this catch added
      .catch((error) => {
        console.log("App.jsx, getCurrentUser error", error);
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  ) : <ThreeDot color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
}

export default App
