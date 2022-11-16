import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import NavbarAdmin from '../NavbarAdmin';

export default function ToiletRecomendation() {
    const [collection, setCollection] = useState([]);
    const [show, setShow] = useState(false);
    const [latlng, setLatlng] = useState({
        lat: 0,
        lng: 0
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function consult() {
            let data = {};
            data['AuthorizationToken'] = localStorage.getItem('Authorization-Token');

            let response = await fetch('http://localhost:8080/toiletrecomendation/getcollection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let responseData = await response.json();
            setCollection(responseData.collection);
        }
        consult()
    }, [])

    async function deleteToiletRecomendation(id) {
        let token = localStorage.getItem('Authorization-Token');
        let data = {
            AuthorizationToken: token,
            id: id
        }
        let response = await fetch('http://localhost:8080/toiletrecomendation/deletedoc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let newCollection = collection.filter((item) => item.id != id);
        setCollection(newCollection)
    }

    function generateId() {
        let id = new Date().getTime();
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (id + Math.random() * 16) % 16 | 0;
            id = Math.floor(id / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    async function toiletRecomendationToToilets(toilet) {
        let token = localStorage.getItem('Authorization-Token');

        let data = {
            calification: toilet.calification,
            cleaning_calification: toilet.cleaning_calification,
            privacy_calification: toilet.privacy_calification,
            free: toilet.free,
            disability_access: toilet.disability_access,
            diaper_changing: toilet.diaper_changing,
            address: toilet.address,
            apertura: toilet.apertura,
            cerrado: toilet.cerrado,
            id: toilet.id,
            lng: latlng.lng,
            lat: latlng.lat,
            AuthorizationToken: token,
        }

        let response = await fetch('http://localhost:8080/toiletrecomendation/toiletrecomendationtotoilets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let dataResponse = await response.json();
        if (dataResponse.code === 200) {
            let newCollection = collection.filter((item) => item.id != toilet.id);
            setCollection(newCollection)
        }

    }
    function showToiletRecomendation() {
        return collection.map((toilet) =>
            <Col >
                <Card style={{ width: '18rem' }} className="card-P">
                    <Card.Body>
                        <Card.Title>{toilet.address}</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            <div>
                                <p> Apertura: {toilet.apertura}</p>
                            </div>
                            <div>
                                <p>Cierre: {toilet.cerrado}</p>
                            </div>
                            <div>
                                <p> Calificación: {toilet.calification}</p>
                            </div>
                            <div>
                                <p>  Calificación en limpieza: {toilet.cleaning_calification}</p>
                            </div>
                            <div>
                                <p>  Calificacion en privacidad: {toilet.privacy_calification}</p>
                            </div>
                            <div>
                                <p>  ¿Cuenta con mudador?: {(toilet.diaper_changing) ? "Si" : "No"}</p>
                            </div>
                            <div>
                                <p>  ¿Cuenta con acceso para personas en situación de discapacidad?: {(toilet.disability_access) ? "Si" : "No"}</p>
                            </div>
                            <div>
                                <p>   ¿Es gratis?: {(toilet.free) ? "Si" : "No"}</p>
                            </div>
                            <div>
                                <Button variant="primary" onClick={handleShow}>
                                    Agregar propuesta
                                </Button>
                            </div>
                            <br />
                            <div>
                                <Button onClick={() => deleteToiletRecomendation(toilet.id)}>
                                    Eliminar propuesta
                                </Button>
                            </div>
                        </Card.Text>


                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ingrese Latitud y longitud</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label className="input-label" htmlFor="latitud">Latitud</label>
                            <br />
                            <input type="text" placeholder="Latitud" id="latitud" name="latitud" onChange={(e) => setLatlng({ ...latlng, lat: e.target.value })} required />

                        </div>
                        <div>
                            <label className="input-label" htmlFor="Longitud">Longitud</label>
                            <br />
                            <input type="text" placeholder="Longitud" id="Longitud" name="Longitud" onChange={(e) => setLatlng({ ...latlng, lng: e.target.value })} required />

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={() => toiletRecomendationToToilets(toilet)}>
                            Guardar baño
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        )
    }


    return (<>
       <NavbarAdmin/>
        <Container fluid={true}>
            <Row>
                {showToiletRecomendation()}
            </Row>
        </Container>


    </>)


}