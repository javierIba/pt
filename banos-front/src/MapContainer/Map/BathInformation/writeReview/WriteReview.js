
import { Autocomplete } from '@react-google-maps/api';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import StarsReview from '../../../../icons/starsReview/StarsReview';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


export default function WriteReview(props) {
    const [formData, setFormData] = useState({
        calification: 0,
        cleaning_calification: 0,
        privacy_calification: 0,
        free: false,
        disability_access: false,
        diaper_changing: false
    })

    /*aqui va el fetch */
    const handleForm = async() => {
        let data = formData;
        let AuthorizationToken = localStorage.getItem('Authorization-Token');
        data['AuthorizationToken'] = AuthorizationToken;
        data['id'] = props.id
        let response = await fetch('http://localhost:8080/toilets/postreview',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });
        let dataResponse = await response.json();
        console.log(dataResponse);
        props.close();
     }


    return (
        <>


            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Cuentanos tu experencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Autocomplete>
                        <input type="text" id="pac-input" />
                    </Autocomplete> */}
                    <div className="login-page">

                        <div className="form">
                            <form className="register-form" >
                                <div >
                                    <label className="input-label" htmlFor="signupName">¿Qué calificación le darias?</label>
                                    {/* <input type="text" placeholder="Nombre" id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required /> */}
                                    {/* {(nameValidation) && <p className="error-message">{validationErrorMessage.name}</p>} */}
                                    <div>
                                        <StarsReview handleStars={(x) => setFormData({ ...formData, calification: x })} value={formData.calification} />
                                    </div>

                                </div>
                                <div >
                                    <label className="input-label" htmlFor="signupName">¿Qué calificación le darias a la limpieza?</label>
                                    {/* <input type="text" placeholder="Nombre" id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required /> */}
                                    {/* {(nameValidation) && <p className="error-message">{validationErrorMessage.name}</p>} */}
                                    <div>
                                        <StarsReview handleStars={(x) => setFormData({ ...formData, cleaning_calification: x })} value={formData.cleaning_calification} />
                                    </div>
                                    {console.log(formData)}

                                </div>

                                <div >
                                    <label className="input-label" htmlFor="signupName">¿Qué calificación le darias a la limpieza</label>
                                    {/* <input type="text" placeholder="Nombre" id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required /> */}
                                    {/* {(nameValidation) && <p className="error-message">{validationErrorMessage.name}</p>} */}
                                    <div>
                                        <StarsReview handleStars={(x) => setFormData({ ...formData, privacy_calification: x })} value={formData.privacy_calification} />
                                    </div>

                                </div>

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
                                <Button variant="contained" endIcon={<SendIcon />} onClick={handleForm}>
                                    Recomendar
                                </Button>
                            </form>
                        </div>
                    </div>

                </Modal.Body>
                
            </Modal>
        </>
    );


}