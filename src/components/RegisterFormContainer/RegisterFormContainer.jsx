import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import './RegisterFormContainer.css'

export function RegisterFormContainer() {
    const navigateTo = useNavigate()
    const FORM_REF = useRef(null)
    const [registerInProcess, setRegisterInProcess] = useState(false)

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

    const validateForm = (name, email, email_2, password, password_2) => {        
        if (name === "") {
            Swal.fire("ERROR: El campo 'Nombre' NO puede estar vacío.", "", "error")
            return false
        }
        
        if (validateEmail(email) === false) {
            Swal.fire("ERROR: El correo electrónico ingresado no es válido.", "", "error")
            return false
        }

        if (email !== email_2) {
            Swal.fire("ERROR: El correo electrónico ingresado no es válido.", "", "error")
            return false
        }
        
        if (password.length < 6) {
            Swal.fire("ERROR: La contraseña tiene que tener al menos 6 caracteres.", "", "error")
            return false
        }

        if (password !== password_2) {
            Swal.fire("ERROR: La contraseña tiene que tener al menos 6 caracteres.", "", "error")
            return false
        }

        return true
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    
        const NAME = FORM_REF.current.children[0].value.trim()
        
        const EMAIL = FORM_REF.current.children[1].value // En HTML5 aplica trim() nativamente
        const EMAIL_2 = FORM_REF.current.children[2].value

        const PASSWORD = FORM_REF.current.children[3].value
        const PASSWORD_2 = FORM_REF.current.children[4].value

        if (validateForm(NAME, EMAIL, EMAIL_2, PASSWORD, PASSWORD_2) === false) return

        setRegisterInProcess(true)

        const USER = {
            name: NAME,
            email: EMAIL,
            password: PASSWORD
        }

        fetch(import.meta.env.VITE_AUTH_REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(USER)
        })
        .then(Swal.fire({
            title: "REGISTRO EXITOSO",
            html: `¡Bienvenido a BiteWise! Su cuenta ha sido creada. Inicie sesión para comenzar a disfrutar de nuestros servicios.`,
            icon: "success"
        }).then(() => navigateTo('/login')))
        .catch(error => {
            Swal.fire({
            title: "Error al registrarte",
            html: `No pudimos procesar la solicitud en nuestros servidores. Por favor intente de nuevo.`,
            icon: "error"
            }).then(() => setRegisterInProcess(false))
        })
    }

    return (
        <div className="register-container">
            {/* <h1>Registrarse</h1>*/}
        
            

            
            
            <h1>¡Registrate en ByteWise!</h1>
            
            <form className="register-form" id="registerForm" ref={FORM_REF} onSubmit={handleSubmit}>
                <input id="registerFormName" type="text" placeholder="Nombre" required />
                <input id="registerFormEmail" type="email" placeholder="Correo electrónico" required />
                <input id="registerFormEmailConfirmation" type="email" placeholder="Confirmar correo electrónico" required />
                <input id="registerFormPassword" type="password" placeholder="Contraseña" required />
                <input id="registerFormPasswordConfirmation" type="password" placeholder="Confirmar contraseña" required />
                <button type="registerFormSubmit" className="submit-btn">{registerInProcess ? "AGUARDA UNOS INSTANTES": "Registrarse en ByteWise"}</button>
            </form>
            <br/> <br/>
            <p>¿Tienes una cuenta? <Link to="/login">¡Inicia sesión aquí!</Link></p>
            
            {/* Actualmente deshabilitado hasta lograr implementar oAuth en el backend... */}
            {/* <div className="social-login">
                <p>...o a través de</p>
                <button className="social-btn facebook-btn">Facebook</button>
                <button className="social-btn google-btn">Google</button>
                <button className="social-btn apple-btn">Apple</button>
            </div> */}

            <footer>
                <p>Al usar ByteWise, aceptas los <Link to="/terms">Términos de uso</Link>, <Link to href="/privacy">Política de privacidad</Link> y <Link to="/precontractual">Términos precontractuales</Link> de nuestra empresa.</p>
            </footer>
        </div>
    )
}