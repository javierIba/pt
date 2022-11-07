import { useState, useEffect } from 'react'
import './signup.css'



export default function SignUp() {
    const [userData, setUserData] = useState({
        email: null,
        password: null,
        name: null
    });
    
    const [isClick, setIsClick] = useState({
        email: false,
        password: false,
        name: false
    });
    
    const [errorMessage, setErrorMessage] = useState(null);
    
    
    const validationErrorMessage = {
        email:"Email no valido, debe cumplir con el siguiente formato: xxx@xxx.xxx",
        password:"La contraseña debe tener más de 6 caracteres",
        name:"Nombre no valido, solo puede contener letras"
    };

    const emailRegx = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    const nameRegx = /^[a-zA-Z]+$/;

    const emailValidation = (userData.email !== null) && !emailRegx.test(userData.email) && isClick.email;
    const passwordValidation = (userData.password !== null) && (6 >= userData.password.length) && isClick.password;
    const nameValidation = (userData.name !== null) && !nameRegx.test(userData.name) && isClick.name;


    function handleInputsForm(e) {

        switch (e.target.name) {
            case "email":
                setUserData({ ...userData, email: e.target.value });
                break;
            case "password":
                setUserData({ ...userData, password: e.target.value });
                break;
            case "name":
                setUserData({ ...userData, name: e.target.value });
                break;
            default:
                break;
        }
    }

   

    function handleForm(e) {
        e.preventDefault()
        

    }


    return (<>
        <div className="login-page">

            <div className="form">
                <form className="register-form" onSubmit={(e) => handleForm(e)}>
                    <div >
                        <label className="input-label" htmlFor="signupName">Nombre</label>
                        <input type="text" placeholder="Nombre" className={(nameValidation) ? "error-input" : undefined} id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required />
                        {(nameValidation) && <p className="error-message">{validationErrorMessage.name}</p>}

                    </div>
                    <div>
                        <label className="input-label" htmlFor="signupPassword">Contraseña</label>
                        <input type="password" placeholder="Contraseña" className={(passwordValidation) ? "error-input" : undefined} id="signupPassword" name="password" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, password: true })} required />
                        {(passwordValidation) && <p className="error-message">{validationErrorMessage.password}</p>}

                    </div>
                    <div>
                        <label className="input-label" htmlFor="signupEmail">Email</label>
                        <input type="email" placeholder="Email" id="signupEmail" className={(emailValidation) ? "error-input" : undefined} name="email" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, email: true })} required />
                        {(emailValidation) && <p className="error-message">{validationErrorMessage.email}</p>}
                    </div>

                    <button >Registrarse</button>
                    <p className="message">¿Ya estas registrado? <a href="#">Inicia sesión</a></p>
                    <p className="error-message">{errorMessage}</p>
                </form>
            </div>
        </div>
    </>)
}