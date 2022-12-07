import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import StarsReview from './../../icons/starsReview/StarsReview'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import MiniMap from '../MiniMap/MiniMap';
import './BathRecomendation.css'

export default function BathRecomendation(props) {
    const [formData, setFormData] = useState({
        calification: 0,
        cleaning_calification: 0,
        privacy_calification: 0,
        free: false,
        disability_access: false,
        diaper_changing: false,
        address: "",
        apertura: '00:00',
        cierre: '00:00',
        latlng: null
    });
    const [message, setMessage] = useState({
        errorMessage: '',
        success: false,
        successMessage: ''
    });
    function setLatLng(latlng) {
        setFormData({ ...formData, latlng: latlng });
    }

    async function handleForm() {
        if (formData.calification === 0 || formData.cleaning_calification === 0 || formData.privacy_calification === 0) {
            setMessage({ ...message, errorMessage: 'Por favor rellene todos los campos' });
        } else {
            setMessage({
                errorMessage: '',
                success: true,
                successMessage: 'Se ha enviado exitosamente'
            });
            saveDataReview();
        }
    }

    async function saveDataReview() {
        let data = formData;
        let id = generateId();
        data['id'] = id;
        data['AuthorizationToken'] = localStorage.getItem('Authorization-Token');
        let reponse = await fetch('http://localhost:8080/toiletrecomendation/toiletAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let dataReponse = await reponse.json();
        props.close();
    }
    function generateId() {
        let id = new Date().getTime();
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (id + Math.random() * 16) % 16 | 0;
            id = Math.floor(id / 16);
            return (c === 'x' ? r : ((r & 0x3) | (0x8))).toString(16);
        });
        return uuid;
    }
    return (
        <>
            {(message.success) ?

                <Modal show={props.show} onHide={props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='success-message'>{message.successMessage}</p>
                    </Modal.Body>

                </Modal>
                :
                <Modal size="lg" show={props.show} onHide={props.close} >
                    <Modal.Header closeButton>
                        <Modal.Title>Recomienda un baño</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="bath-recomendation">

                            <div>
                                <form>
                                    <div>
                                        <p className="bath-recomendation-title">Haga click en la ubicación del baño</p>
                                        <div>
                                            <MiniMap setLatLng={setLatLng} />
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                            required
                                            label="Dirección"
                                            defaultValue=""
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>Horario de apertura</label>
                                        <div>
                                            <input type="time" id="appt" name="appt"
                                                min="09:00" max="18:00" required onChange={(e) => setFormData({ ...formData, apertura: e.target.value })} />
                                        </div>
                                    </div>
                                    <br />

                                    <div>
                                        <label>Horario de cierre</label>
                                        <div>
                                            <input type="time" id="appt" name="appt"
                                                min="09:00" max="18:00" required onChange={(e) => setFormData({ ...formData, cerrado: e.target.value })} />
                                        </div>
                                    </div>
                                    <br />

                                    <div >
                                        <label className="input-label" htmlFor="signupName">¿Qué calificación le darias?</label>
                                        <div>
                                            <StarsReview handleStars={(x) => setFormData({ ...formData, calification: x })} value={formData.calification} />
                                        </div>

                                    </div>
                                    <br />

                                    <div >
                                        <label className="input-label" htmlFor="signupName">¿Qué calificación le darias a la limpieza?</label>
                                        <div>
                                            <StarsReview handleStars={(x) => setFormData({ ...formData, cleaning_calification: x })} value={formData.cleaning_calification} />
                                        </div>

                                    </div>
                                    <br />

                                    <div >
                                        <label className="input-label" htmlFor="signupName">¿Qué calificación le darias a la privacidad?</label>

                                        <div>
                                            <StarsReview handleStars={(x) => setFormData({ ...formData, privacy_calification: x })} value={formData.privacy_calification} />
                                        </div>

                                    </div>
                                    <br />

                                    <div>
                                        <label className="input-label" htmlFor="signupName">¿Es gratis?</label>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={formData.free}
                                            onChange={(e) => setFormData({ ...formData, free: (e.target.value === 'true') ? true : false })}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Si" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </div>
                                    <br />

                                    <div>
                                        <label className="input-label" htmlFor="signupName">¿Cuenta con acceso para personas en situación de discapacidad?</label>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={formData.disability_access}
                                            onChange={(e) => setFormData({ ...formData, disability_access: (e.target.value === 'true') ? true : false })}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Si" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </div>
                                    <br />

                                    <div>
                                        <label className="input-label" htmlFor="signupName">¿Cuenta con mudador?</label>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={formData.diaper_changing}
                                            onChange={(e) => setFormData({ ...formData, diaper_changing: (e.target.value === 'true') ? true : false })}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Si" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </div>
                                    <p className='error-message'>{message.errorMessage}</p>

                                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleForm}>
                                        Recomendar baño
                                    </Button>
                                </form>
                            </div>
                        </div>

                    </Modal.Body>

                </Modal >
            }

        </>)
}