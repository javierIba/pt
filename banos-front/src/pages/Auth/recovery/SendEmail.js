import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';

export default function SendEmail() {
    const [email, setEmail] = useState('');
    const [enviado,setEnviado] = useState(false);

    async function handleInput() {
        let link = `http://localhost:3000/recuperar/${email}`
        let data = {
            email: email,
            link: link
        }
        emailjs.send('service_6pzrodl', 'template_sfafqdn', data,'N318aKa7bi3Nw6r4Y')
            .then(function (response) {
                setEnviado(true)
                console.log('SUCCESS!', response.status, response.text);
            }, function (err) {
                console.log('FAILED...', err);
            });
    }

    return (<>
    {(!enviado)?
        <div className="login-page">
            <div className="form">

                <label className="input-label" htmlFor="signupEmail">Email</label>
                <input type="email" placeholder="Email"  name="email" onChange={(e) => setEmail(e.target.value)} required />
                <button type="button" onClick={handleInput} >Recuperar contraseña</button>

            </div>
        </div>:
        <div className="login-page">
            <div className="form">

                <h1>Revise su email</h1>

            </div>
        </div>

    }
      
    </>)
}