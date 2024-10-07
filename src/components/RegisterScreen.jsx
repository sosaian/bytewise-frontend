function RegisterScreen() {
    return (
        <div className="register-container">
           {/* <h1>Registrarse</h1>*/}
      
           
           <p>¿Tienes una cuenta? <a href="/login">¡Inicia sesión aquí!</a></p>

           <br/> <br/>

           <h3>Sino te invitamos a registrarte:</h3>
            <form className="register-form">
                <input type="email" placeholder="Dirección de correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="password" placeholder="Confirmar contraseña" required />
                <button type="submit" className="submit-btn">Si! Me quiero registrar en ByteWise</button>
            </form>
          
            <div className="social-login">
                <p>...o a través de</p>
                <button className="social-btn facebook-btn">Facebook</button>
                <button className="social-btn google-btn">Google</button>
                <button className="social-btn apple-btn">Apple</button>
            </div>

            <footer>
                <p>Al usar ByteWise, aceptas los <a href="/terms">Términos de uso</a>, <a href="/privacy">Política de privacidad</a> y <a href="/precontractual">Términos precontractuales</a> de nuestra empresa.</p>
            </footer>
        </div>
    );
}

  export default RegisterScreen