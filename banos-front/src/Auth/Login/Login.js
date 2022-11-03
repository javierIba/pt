import { useState, useEffect } from 'react'
import './login.css'

export default function Login() {
    const [userData, setUserData] = useState({
        email: null,
        password: null
    })

    

    function handleInputsForm(e) {
        switch (e.target.name) {
            case "email":
                setUserData({ ...userData, email: e.target.value });
                break;
            case "password":
                setUserData({ ...userData, password: e.target.value });
                break;
            default:
                break;
        }
       
        
    }


    return (<>
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="email" placeholder="Email" name="email" onChange={(e) => { handleInputsForm(e) }} />
                    <input type="password" placeholder="Contraseña" name="password" onChange={(e) => { handleInputsForm(e) }} />
                    <button>Iniciar Sesión</button>
                    <p className="message">¿Aún no estas registrado? <a href="#">Crea una cuenta</a></p>
                </form>
            </div>
        </div>
    </>)
}