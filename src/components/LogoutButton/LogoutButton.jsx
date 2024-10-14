import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import Swal from 'sweetalert2'
import './LogoutButton.css'

export function LogoutButton(){
    const { clearLogin } = useContext(LoginContext)

    const navigateTo = useNavigate()

    const [logoutInProcess, setLogoutInProcess] = useState(false)

    const handleLogout = (event) => {
        event.preventDefault()

        Swal.fire({
            title: "Estás por cerrar sesión... ¿Continuar?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Cerrar sesión",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
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
                    }).then(() => {
                        clearLogin()
                        navigateTo('/login')
                    })
                })
                .catch(error => console.error(error))
            }
        })
    }
    return (
        <>
            <button id="logoutButton" onClick={handleLogout}>
                {logoutInProcess ? "AGUARDA UNOS INSTANTES": "👋🏻 Cerrar Sesión"}
            </button>
        </>
    )
}