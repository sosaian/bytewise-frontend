import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './LogoutButton.css'

export function LogoutButton()
{
    const navigateTo = useNavigate()

    const [logoutInProcess, setLogoutInProcess] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        setLogoutInProcess(true)

        fetch(import.meta.env.VITE_AUTH_LOGOUT_URL, {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(() => {
            setLogoutInProcess(false)
            
            Swal.fire({
            title: "CIERRE DE SESIÓN EXISTOSO!",
            html: `¡Nos vemos la próxima!`,
            icon: "success"
            }).then(() => navigateTo('/login'))
        })
        .catch(error => console.error(error))
    }

    return (
        <>
            <button onClick={handleSubmit}>
                {logoutInProcess ? "AGUARDA UNOS INSTANTES": "👋🏿 Cerrar Sesión"}
            </button>
        </>
    )
}