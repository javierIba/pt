import { useState, useEffect } from 'react'
import './signup.css'



/******************************************************************************************
Tareas pendientes 
-Crear validadores de datos
***************************************************************************************** */

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
    const emailRegx = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    const nameRegx = /^[a-zA-Z]+$/
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

    /*VALIDAR DATOS*/

    function handleForm(e) {
        e.preventDefault()


    }


    return (<>
        <div className="login-page">

            <div className="form">
                <form className="register-form" onSubmit={(e) => handleForm(e)}>
                    <div >
                        <label className="input-label" for="signupName">Nombre</label>
                        <input type="text" placeholder="Nombre" className={(nameValidation) && "error-input"} id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required />
                        {(nameValidation) && <p class="error-message">Nombre no valido, solo puede contener letras</p>}

                    </div>
                    <div>
                        <label className="input-label" for="signupPassword">Contraseña</label>
                        <input type="password" placeholder="Contraseña" id="signupPassword" name="password" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, password: true })} required />
                        {(passwordValidation) && <p class="error-message">La contraseña debe tener más de 6 caracteres</p>}

                    </div>
                    <div>
                        <label className="input-label" for="signupEmail">Email</label>
                        <input type="email" placeholder="Email" id="signupEmail" name="email" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, email: true })} required />
                        {(emailValidation) && <p class="error-message">Email no valido, debe cumplir con el siguiente formato: xxx@xxx.xxx</p>}
                    </div>

                    <button >Registrarse</button>
                    <p className="message">¿Ya estas registrado? <a href="#">Inicia sesión</a></p>
                    <p className="error-message">{errorMessage}</p>
                </form>
            </div>
        </div>
    </>)
}