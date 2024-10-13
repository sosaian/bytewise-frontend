import { useContext, useRef, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import logo from '/assets/img/color-bw-03.svg'
import './LoginFormContainer.css'

export function LoginFormContainer() {
    const navigateTo = useNavigate()
    const FORM_REF = useRef(null)
    const { setLogin } = useContext(LoginContext)

    const validateEmail = (email) => {
        /*
        Es importante tener en cuenta que no cubre todos los casos posibles y específicos definidos por
            los estándares de correos electrónicos (RFC 5322), pero es adecuado para la mayoría de los
            propósitos comunes.
        */
    
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        /* 
            Desglose de la Expresión Regular
                ^: Comienzo de la línea.
                [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
                @: Exactamente un símbolo '@'.
                [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
                \.: Exactamente un punto '.'.
                [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
                $: Fin de la línea.
        */
    
        return regex.test(email)
    }

    const validateForm = (email, password) => {
        if (validateEmail(email) === false) {
            Swal.fire("ERROR: El correo electrónico ingresado no es válido.", "", "error")
            return false
        }
        
        if (password.length < 6) {
            Swal.fire("ERROR: La contraseña tiene que tener al menos 6 caracteres.", "", "error")
            return false
        }

        return true
    }

    const handleSubmit = (event) => {
        event.preventDefault()
            
        const EMAIL = FORM_REF.current.children[0].value // En HTML5 aplica trim() nativamente

        const PASSWORD = FORM_REF.current.children[1].value

        if (validateForm(EMAIL, PASSWORD) === false) return

        setLoginInProcess(true)

        const USER = {
            email: EMAIL,
            password: PASSWORD
        }

        fetch(import.meta.env.VITE_AUTH_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(USER),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.name) {
                setLogin({ valid: true, name: data.name })
                console.log("Login successful")
            } else {
                console.log("Login failed")
            }
        })
        .then(() => {
            setLoginInProcess(false)
            
            Swal.fire({
            title: "INICIO DE SESIÓN EXISTOSO!",
            html: `¡Bienvenido a BiteWise!`,
            icon: "success"
            }).then(() => navigateTo('/dashboard'))
        })
        .catch(error => console.error(error))
    }

    const [loginInProcess, setLoginInProcess] = useState(false)

    return (
        <>
            <img src={logo} alt="Logo" className="logo" />
            <h1>LOGIN</h1>
            <p>¿Nuevo en ByteWise? <Link to="/register">¡Crea una cuenta aquí!</Link></p>
            <form className="login-form" id="loginForm" ref={FORM_REF} onSubmit={handleSubmit}>
                <input id="loginFormEmail" type="email" placeholder="Correo electrónico" required />
                <input id="loginFormPassword" type="password" placeholder="Contraseña" required />
                <button type="loginFormSubmit" className="submit-btn">{loginInProcess ? "AGUARDA UNOS INSTANTES": "Iniciar Sesión"}</button>
            </form>
        </>
    )
}
