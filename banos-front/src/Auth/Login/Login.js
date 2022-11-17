import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login() {
    const [userData, setUserData] = useState({
        email: null,
        password: null
    });
    const [isClick, setIsClick] = useState({
        email: false,
        password: false,
        name: false
    });

    const [serverResponse, setServerResponse] = useState({
        code: null,
        message: null
    });
    const navigate = useNavigate();

    const validationErrorMessage = {
        email: "Email no valido, debe cumplir con el siguiente formato: xxx@xxx.xxx",
        password: "La contraseña debe tener más de 6 caracteres",
        name: "Nombre no valido, solo puede contener letras"
    };
    const emailRegx = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

    const emailValidation = (userData.email !== null) && !emailRegx.test(userData.email) && isClick.email;
    const passwordValidation = (userData.password !== null) && (6 >= userData.password.length) && isClick.password;

    async function signin() {
        let response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        let responseData = await response.json();
        setServerResponse({
            code: responseData.code,
            message: responseData.message
        });
        if (responseData.token) {
            localStorage.setItem('Authorization-Token', responseData.token);
            navigate('/');  
        }
    }

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

    function handleForm(e) {
        e.preventDefault();
        signin();


    }

    return (<>
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={(e) => handleForm(e)}>
                    <div>
                        <label className="input-label" htmlFor="signupEmail">Email</label>
                        <input type="email" placeholder="Email" id="signupEmail" className={(emailValidation) ? "error-input" : undefined} name="email" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, email: true })} required />
                        {(emailValidation) && <p className="error-message">{validationErrorMessage.email}</p>}
                    </div>
                    <div>
                        <label className="input-label" htmlFor="signupPassword">Contraseña</label>
                        <input type="password" placeholder="Contraseña" id="signupPassword" name="password" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, password: true })} required />
                        {/* {(passwordValidation) && <p className="error-message">{validationErrorMessage.password}</p>} */}

                    </div>
                    <button type="button" onClick={(e) => handleForm(e)}>Iniciar Sesión</button>
                    <p className="message">¿Aún no estas registrado? <a onClick={() => navigate('/signUp')}>Crea una cuenta</a></p>
                    <p className={(serverResponse.code === 200) ? "accepted-message" : "error-message"}>{serverResponse.message}</p>
                </form>
            </div>
        </div>
    </>)
}