import { Link } from 'react-router-dom'

export function RegisterScreen() {
    return (
        <div className="register-container">
           {/* <h1>Registrarse</h1>*/}
      
           <p>¿Tienes una cuenta? <Link to="/login">¡Inicia sesión aquí!</Link></p>

           <br/> <br/>

           <h3>Sino te invitamos a registrarte:</h3>
            <form className="register-form">
                <input type="email" placeholder="Dirección de correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="password" placeholder="Confirmar contraseña" required />
                <button type="submit" className="submit-btn">Si! Me quiero registrar en ByteWise</button>
            </form>
          
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