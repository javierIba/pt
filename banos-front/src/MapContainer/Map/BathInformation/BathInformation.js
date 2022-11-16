import { useState, useEffect, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Offcanvas, Container, Row, Col, Card, Button } from 'react-bootstrap';
import IconModel from '../../../icons/IconModel'
import iconOptions from '../../../icons/IconOptions';
import validateToken from './../../../helpers/auth';
import { useNavigate } from "react-router-dom";
import WriteReview from './writeReview/WriteReview';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import Map from '../Map';

import BathRecomendation from './bathRecomendation/BathRecomendation';


/*global google*/
export default function BathInformation(props) {
  const show = props.show;
  const handleClose = props.handleClose;
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showBathRecomendation, setShowBathRecomendation] = useState(false);
  // const toiletInformation = props.toiletInformation;
  const [toiletInformation, setToiletInformation] = useState(null);
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();

  //Funciones PARA LA RUTA

  const [gpsData, setGpsData] = useState('Brasil 2241, 2362807 Valparaíso');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGpsData({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      console.log("Gps no aceptado");
    }
  }, []);



  const [directionsResponse, setDirectionResponse] = useState(null)


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

  /* function clearRoute(destino){
      setDirectionResponse(null)
      destino = ''
  }*/

  //TERMINA FUNCIONES PARA LA RUTA


  useEffect(() => {
    async function getToiletInformation() {
      const data = {
        id: props.id
      }
      let response = await fetch("http://localhost:8080/toilets/getToilet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      });

      let information = await response.json();
      setToiletInformation(information.doc);
    }
    async function tokenValidate() {
      let token = localStorage.getItem('Authorization-Token');
      let isValidate = await validateToken(token);
      setIsToken(isValidate);
    }
    getToiletInformation();
    tokenValidate();

  }, []);
  const offcanvasTittle = "Información";
  const iconFullStarOptions = iconOptions.iconStarFull;

  const iconEmptyStarOptions = iconOptions.iconStarEmpty;

  function calification(array) {
    let starsQuantity = averageRange(array);

    let stars = [];
    let fullStar = <IconModel options={iconFullStarOptions} />;
    let emptyStar = <IconModel options={iconEmptyStarOptions} />
    for (let i = 0; i < starsQuantity; i++) {
      stars.push(fullStar);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(emptyStar)
    }
    return stars;
  }

  function averageRange(array) {
    if (Array.isArray(array)) {
      let sum = array.reduce((acc, next) => acc += next, 0);
      return sum / array.length
    }
  }

  function calculateYesNo(array) {
    if (Array.isArray(array)) {
      let sum = array.reduce((acc, next) => (next === true) ? acc += 1 : 0, 0);
      if (sum > (array.length * 0.6)) {
        return true
      }
      return false
    }
  }

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
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Calificación</h5>
                    <h5 className='text-center'>{calification(toiletInformation.reviews.map(review => review.calification))}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Limpieza</h5>
                    <h5 className='text-center'>{calification(toiletInformation.reviews.map(review => review.cleaning_calification))}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Privacidad</h5>
                    <h5 className='text-center'>{calification(toiletInformation.reviews.map(review => review.privacy_calification))}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Gratis</h5>
                    <h5 className='text-center'>{(calculateYesNo(toiletInformation.reviews.map(review => review.free))) ? "Si" : "No"}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Acceso para personas en situación de discapacidad</h5>
                    <h5 className='text-center'>{(calculateYesNo(toiletInformation.reviews.map(review => review.disability_access))) ? "Si" : "No"}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Mudador</h5>
                    <h5 className='text-center'>{(calculateYesNo(toiletInformation.reviews.map(review => review.diaper_changing))) ? "Si" : "No"}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Horario</h5>
                    <h5 className='text-center'>{`${toiletInformation.apertura} a ${toiletInformation.cerrado}`}</h5>
                  </Card>
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
                            window.location.reload() }}>Cerrar sesión</Button>
                        </Card>

                      </> :
                      <Card bg='info' border="secondary">
                        <Button variant="secondary" onClick={() => navigate('/login')}>¿Quieres agregar una opinión? Inicia sesión</Button>
                      </Card>


                  }

                </Col>
              </Row>
            </Container>
            {/* {console.log(showWriteReview)} */}
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

