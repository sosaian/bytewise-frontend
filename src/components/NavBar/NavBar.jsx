import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'
import { LogoutButton } from '../LogoutButton/LogoutButton'

export function NavBar()
{
    return (
        <>
            <nav>
                <Link to={'/'}>
                    ByteWise
                </Link>
                <NavLink to={'/register'} className={({ isActive }) => isActive ? "active" : ""}>
                    Registro
                </NavLink>
                <NavLink to={'/login'} className={({ isActive }) => isActive ? "active" : ""}>
                    Login
                </NavLink>
                <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? "active" : ""}>
                    Dashboard
                </NavLink>
                <NavLink to={'/transactions'} className={({ isActive }) => isActive ? "active" : ""}>
                    Transacciones
                </NavLink>
                <NavLink to={'/tasks'} className={({ isActive }) => isActive ? "active" : ""}>
                    Tareas
                </NavLink>
            </nav>
            <LogoutButton />
        </>
    )
}