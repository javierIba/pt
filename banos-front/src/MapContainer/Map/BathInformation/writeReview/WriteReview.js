
import { Autocomplete } from '@react-google-maps/api';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarsReview from '../../../../icons/starsReview/StarsReview';

export default function WriteReview(props) {
    const [formData, setFormData] = useState({
        calification: 1,
        cleaning_calification: 1,
        privacy_calification: 1
    })
    const [isClick, setIsClick] = useState({});

    const handleForm = () => { }

    function handleInputsForm(e) {
        // switch (e.target.name) {
        //     case "calification":
        //         setFormData({ ...formData, calification: e.target.value });
        //         break;
        //     case "cleaning":
        //         setFormData({ ...formData, cleaning_calification: e.target.value });
        //         break;
        //     case "privacy":
        //         setFormData({ ...formData, privacy_calification: e.target.value });
        //         break;

        // }
    }


    // const center = { lat: 50.064192, lng: -130.605469 };
    // const defaultBounds = {
    //     north: center.lat + 0.1,
    //     south: center.lat - 0.1,
    //     east: center.lng + 0.1,
    //     west: center.lng - 0.1,
    // };

    // const options = {
    //     bounds: defaultBounds,
    //     componentRestrictions: { country: "us" },
    //     fields: ["address_components", "geometry", "icon", "name"],
    //     strictBounds: false,
    //     types: ["establishment"],
    // };


    // // eslint-disable-next-line no-undef
    // const autocomplete = new google.maps.places.Autocomplete(input, options);


    return (
        <>


            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Recomienda un baño</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Autocomplete>
                        <input type="text" id="pac-input" />
                    </Autocomplete> */}
                    <div className="login-page">

                        <div className="form">
                            <form className="register-form" onSubmit={(e) => handleForm(e)}>
                                <div >
                                    <label className="input-label" htmlFor="signupName">Calificación</label>
                                    {/* <input type="text" placeholder="Nombre" id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required /> */}
                                    {/* {(nameValidation) && <p className="error-message">{validationErrorMessage.name}</p>} */}
                                    <StarsReview handleStars={(x) => setFormData({ ...formData, calification: x })} name={"califitation"}/>
                           

                                   </div>
                                <div >
                                    <label className="input-label" htmlFor="signupName">Limpieza</label>
                                    {/* <input type="text" placeholder="Nombre" id="signupName" name="name" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, name: true })} required /> */}
                                    {/* {(nameValidation) && <p className="error-message">{validationErrorMessage.name}</p>} */}
                                    <StarsReview handleStars={(x) => setFormData({ ...formData, cleaning_calification: x })} />
                                    {console.log(formData)}

                                </div>
                                <div>
                                    <label className="input-label" htmlFor="signupPassword">Contraseña</label>
                                    <input type="password" placeholder="Contraseña" id="signupPassword" name="password" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, password: true })} required />
                                    {/* {(passwordValidation) && <p className="error-message">{validationErrorMessage.password}</p>} */}

                                </div>
                                <div>
                                    <label className="input-label" htmlFor="signupEmail">Email</label>
                                    <input type="email" placeholder="Email" id="signupEmail" name="email" onChange={(e) => handleInputsForm(e)} onClick={() => setIsClick({ ...isClick, email: true })} required />
                                    {/* {(emailValidation) && <p className="error-message">{validationErrorMessage.email}</p>} */}
                                </div>

                                {/* <button >Registrarse</button>
                                <p className="message">¿Ya estas registrado? <a onClick={() => navigate('/login')}>Inicia sesión</a></p> */}
                                {/* <p className={(serverResponse.code === 200) ? "accepted-message" : "error-message"}>{serverResponse.message}</p> */}
                            </form>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}