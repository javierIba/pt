import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Offcanvas, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { calification, calculateYesNo } from '../../helpers/calification';

import { useNavigate } from "react-router-dom";
import WriteReview from '../writeReview/WriteReview';
import BathRecomendation from './../bathRecomendation/BathRecomendation';
import { useTokenValidate } from '../../hooks/useTokenValidate';
import { useGps } from '../../hooks/useGps';
import { useGetToiletInformation } from '../../hooks/useGetToiletInformation';
import DisplayInformationCard from '../DisplayInformationCard.jsx/DisplayInformationCard';
/*global google*/
export default function BathInformation(props) {
  const show = props.show;
  const handleClose = props.handleClose;
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showBathRecomendation, setShowBathRecomendation] = useState(false);

  const navigate = useNavigate();
  const gpsData = useGps('Brasil 2241, 2362807 Valparaíso');
  const toiletInformation = useGetToiletInformation(props.id)
  const isToken = useTokenValidate('Authorization-Token');

  async function calculateRoute() {
    // eslint-disable-next-line no-undef

    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: gpsData,
      destination: toiletInformation.address,
      travelMode: google.maps.TravelMode.WALKING
    })

    props.mapa(results)

  }

  const offcanvasTittle = "Información";



  return (
    <>
      {(toiletInformation) ?
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='text-center'>{offcanvasTittle}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container>
              <Row>
                <Col>
                  <Card bg='info' border="secondary">
                    <h3 className='text-center'>{toiletInformation.address}</h3>
                  </Card>
                  <br />

                  <DisplayInformationCard title={'Calificación'} content={calification(toiletInformation.reviews.map(review => review.calification))} />
                  <br />

                  <DisplayInformationCard title={'Limpieza'} content={calification(toiletInformation.reviews.map(review => review.cleaning_calification))} />

                  <br />
                    
                  <DisplayInformationCard title={'Privacidad'} content={calification(toiletInformation.reviews.map(review => review.privacy_calification))} />

                  <br />

                  <DisplayInformationCard title={'Gratis'} content={(calculateYesNo(toiletInformation.reviews.map(review => review.free))) ? "Si" : "No"} />

                  <br />

                  <DisplayInformationCard title={'Acceso para personas en situación de discapacidad'} content={(calculateYesNo(toiletInformation.reviews.map(review => review.disability_access))) ? "Si" : "No"} />

                  <br />

                  <DisplayInformationCard title={'Mudador'} content={(calculateYesNo(toiletInformation.reviews.map(review => review.diaper_changing))) ? "Si" : "No"} />

                  <br />
               
                  <DisplayInformationCard title={'Horario'} content={`${toiletInformation.apertura} a ${toiletInformation.cerrado}`} />

                  <br />
                  <Card bg='info' border="secondary">
                    <Button variant="secondary" onClick={() => calculateRoute(toiletInformation.address)}>Mostar ruta</Button>
                  </Card>
                  
                  <br />

                  {
                    (isToken) ?
                      <>
                        <Card bg='info' border="secondary">
                          <Button variant="secondary" onClick={() => setShowWriteReview(true)}>¿Quieres agregar una opinión?</Button>
                        </Card>
                        <br />
                        <Card bg='info' border="secondary">
                          <Button variant="secondary" onClick={() => setShowBathRecomendation(true)}>Recomienda un baño</Button>
                        </Card>
                        <br />
                        <Card bg='info' border="secondary">
                          <Button variant="secondary" onClick={() => {
                            localStorage.removeItem('Authorization-Token');
                            localStorage.removeItem('A');
                            window.location.reload()
                          }}>Cerrar sesión</Button>
                        </Card>

                      </> :
                      <Card bg='info' border="secondary">
                        <Button variant="secondary" onClick={() => navigate('/login')}>¿Quieres agregar una opinión? Inicia sesión</Button>
                      </Card>


                  }

                </Col>
              </Row>
            </Container>
        
            <WriteReview show={showWriteReview} close={() => setShowWriteReview(false)} id={props.id} />
            <BathRecomendation show={showBathRecomendation} close={() => setShowBathRecomendation(false)} />

          </Offcanvas.Body>
        </Offcanvas> :

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Offcanvas.Body>

        </Offcanvas>

      }

    </>
  );
}

