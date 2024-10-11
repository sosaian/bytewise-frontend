import { createContext, useState } from 'react'

export const LoginContext = createContext()

export const LoginComponentContext = ({ children }) => {
    const [login, setLogin] = useState({})

    const clearLogin = () => {
        setLogin({})
    }

    return (
        <LoginContext.Provider value={ { login, setLogin, clearLogin } }>
            {children}
        </LoginContext.Provider>
    )
}