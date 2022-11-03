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
    const [errorMessage,setErrorMessage] = useState(null);
    const emailRegx  = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;



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
   
    function handleForm(e){
        e.preventDefault()
        // if()
        
    }


    return (<>
        <div className="login-page">
            <div className="form">

                <form className="register-form" onClick={(e) => handleForm(e)}>
                    <input type="text" placeholder="Nombre" name="name" onChange={(e) => handleInputsForm(e)} required />
                    <input type="password" placeholder="Contraseña" name="password" onChange={(e) => handleInputsForm(e)} required />
                    <input type="email" placeholder="Email" name="email" onChange={(e) => handleInputsForm(e)} required/>
                    <button >Registrarse</button>
                    <p className="message">¿Ya estas registrado? <a href="#">Inicia sesión</a></p>
                    <p className="error-message">{errorMessage}</p>
                </form>

            </div>
        </div>
    </>)
}