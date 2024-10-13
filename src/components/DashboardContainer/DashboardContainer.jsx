import { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'

export function DashboardContainer() {
    const { login } = useContext(LoginContext)

    return (
        <>
            <h1>{"👋🏿 Hola, " + login.name}</h1>
        </>
    )
}