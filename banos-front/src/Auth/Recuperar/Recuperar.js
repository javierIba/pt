import { useParams } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Recuperar() {
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    async function handleButton() {
        let data = {
            email: params.email,
            password: password
        }

        let reponse = await fetch('http://localhost:8080/users/restablecer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let reponseData = await reponse.json();
        if (reponseData.code === 200) {
            navigate('/login');
        }else{
            setError(reponseData.message);
        }

    }


    return (<>
        <div className="login-page">
            <div className="form">
                <div>
                    <label className="input-label" htmlFor="signupPassword">Nueva contraseña</label>
                    <input type="password" placeholder="Contraseña" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <p>{error}</p>
                <button type="button" onClick={handleButton} >Recuperar contraseña</button>
            </div>
        </div>
    </>)
}