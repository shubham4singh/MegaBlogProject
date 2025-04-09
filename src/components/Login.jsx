import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// We can use Login as authLogin by name
import { login as authLogin } from '../store/authSlice' // for store
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth" // for backend
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm() // in react-hook-form docs..
    const [error, setError] = useState("")

    /* data parameter comes from react-hook-form's handleSubmit */
    /* react-hook-form automatically structures your form inputs into the data object */
    const login = async (data) => {
        setError("") // clean out previous errors

        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
            // now component re-renders and error is shown.
        }
    }

    return (
        <div className='flex items-center justify-center w-full bg-neutral-900'>
            <div className={`mx-auto w-full max-w-lg bg-neutral-950 rounded-xl p-10 border border-black/10`}>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-neutral-50 text-2xl font-bold leading-tight">Sign in to your account</h2>

                <p className="mt-2 text-center text-base text-neutral-50">
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* "handleSubmit" will validate your inputs before invoking above "login" function*/}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"

                            /* hook form js */
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"

                            /* hook form js */
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button type="submit" className="w-full ">Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

/* 
Here we're not directly using refs, but you're using react-hook-form's register function which internally handles references.
In the register function
{}...register("email", { / validation / })}
This spreads properties that include a ref that react-hook-form uses internally.
The ref gets forwarded to the actual <input> DOM element inside your Input component.
*/