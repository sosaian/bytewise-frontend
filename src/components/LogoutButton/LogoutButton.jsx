import './LogoutButton.css'
import { Link } from 'react-router-dom'

export function LogoutButton()
{
    return (
        <>
            <Link to={'/'}>
                <button>👋🏿 Cerrar Sesión</button>
            </Link>
        </>
    )
}