import { createContext, useEffect, useState } from 'react'

export const LoginContext = createContext()

export const LoginComponentContext = ({ children }) => {
    const [login, setLogin] = useState({})

    const checkLogin = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_AUTH_CHECK_URL, {
                method: 'GET',
                credentials: 'include'
            })

            const responseData = await response.json()

            if (responseData.name) {
                setLogin({ valid: true, name: responseData.name })
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const clearLogin = () => {
        setLogin({})
    }

    useEffect(() => { checkLogin() }, [])

    return (
        <LoginContext.Provider value={ { login, setLogin, checkLogin, clearLogin } }>
            {children}
        </LoginContext.Provider>
    )
}