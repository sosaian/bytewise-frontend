import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useLoginRedirect(login) {
    const navigateTo = useNavigate()

    useEffect(() => {
        if ( Object.keys(login).length === 0 ) navigateTo('/login')
    }, [login, navigateTo])
}