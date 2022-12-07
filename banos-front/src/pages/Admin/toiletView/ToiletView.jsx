import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { calification, calculateYesNo, averageRange } from './../../../helpers/calification'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

import NavbarAdmin from '../../../components/NavbarAdmin/NavbarAdmin';
export default function ToiletView() {
    const [toilets, setToilets] = useState([]);

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
    async function changeHour(apertura, cerrado, id) {
        let data = {
            apertura,
            cerrado,
            id
        }
        let reponse = await fetch('http://localhost:8080/toilets/houredit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let reponseData = await reponse.json();
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
                            <Button variant="primary" >
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
        {console.log(toilets)}


    </>)
}