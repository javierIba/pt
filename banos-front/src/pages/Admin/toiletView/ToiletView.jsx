import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { calification, calculateYesNo, averageRange } from './../../../helpers/calification'
import { useState, useEffect } from 'react';

import NavbarAdmin from '../../../components/NavbarAdmin/NavbarAdmin';
export default function ToiletView() {
    const [toilets, setToilets] = useState([]);
    const [show, setShow] = useState(false);
    const [horario,setHorario] = useState({
        apertura:'',
        cerrado:'',
        id:''
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAllToilets()
    }, []);
    async function getAllToilets() {
        try {
            let response = await fetch("http://localhost:8080/toilets/getAllToilets");
            let resonseData = await response.json();
            setToilets(resonseData.collection)

        } catch (error) {
            console.error("Se ha producido un error en la solicitud");
        }
    }
    async function changeHour() {
        
        let reponse = await fetch('http://localhost:8080/toilets/houredit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(horario)
        })
        let reponseData = await reponse.json();
        await getAllToilets()
        handleClose()
    }
    function showToiletRecomendation() {
        return toilets.map((toilet) =>
        (<Col>
            <Card style={{ width: '18rem' }} >
                <Card.Body>
                    <Card.Title>{toilet.address}</Card.Title>

                    <Card.Text>
                        <div>
                            <p> Apertura: {toilet.apertura}</p>
                        </div>
                        <div>
                            <p>Cierre: {toilet.cerrado}</p>
                        </div>
                        <div>
                            <p> Calificación: {averageRange(toilet.reviews.map(review => review.calification))}</p>
                        </div>
                        <div>
                            <p>  Calificación en limpieza: {averageRange(toilet.reviews.map(review => review.cleaning_calification))}</p>
                        </div>
                        <div>
                            <p>  Calificacion en privacidad: {averageRange(toilet.reviews.map(review => review.privacy_calification))}</p>
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
                            <Button variant="primary" onClick={()=>{
                                handleShow();
                                setHorario({...horario,id:toilet.id})
                                }} >
                                Editar horario
                            </Button>
                        </div>
                        <br />

                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>)
        )
    }
    return (<>

        <Container style={{ maxWidth: "100%" }}>
            <Row>
                {showToiletRecomendation()}
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar horario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Horario de apertura</h2>
                <input type="time" onChange={(e)=>setHorario({...horario,apertura:e.target.value})}/>
                <h2>Horario de cierre</h2>
                <input type="time" onChange={(e)=>setHorario({...horario,cerrado:e.target.value})}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    cerrar
                </Button>
                <Button variant="primary" onClick={changeHour}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>



    </>)
}