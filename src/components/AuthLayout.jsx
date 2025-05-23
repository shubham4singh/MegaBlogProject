import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// children: The content to protect (nested routes/components).
// authentication: Boolean (default true) specifying if route requires auth

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        //let authValue = authStatus === true ? true : false

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

/*
If both conditions are not satisfied then the page component is rendered.

Is route protected (authentication=true)?
├─ Yes → Is user NOT logged in (authStatus=false)?
│  ├─ Yes → Redirect to /login
│  └─ No → Show content
└─ No → Is user logged in (authStatus=true)?
   ├─ Yes → Redirect to /
   └─ No → Show content

*/