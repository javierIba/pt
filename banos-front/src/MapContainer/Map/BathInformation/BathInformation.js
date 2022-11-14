import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Offcanvas, Container, Row, Col, Card } from 'react-bootstrap';
import IconModel from '../../../icons/IconModel'
import iconOptions from '../../../icons/IconOptions';
export default function BathInformation(props) {
  const show = props.show;
  const handleClose = props.handleClose;
  // const toiletInformation = props.toiletInformation;
  const [toiletInformation, setToiletInformation] = useState(null);

  useEffect(() => {
    async function getToiletInformation() {
      /*CAMBIAR EL EJEMPLO */
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
    getToiletInformation();

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
      if (sum > (array.length*0.6)){
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
                    <h5 className='text-center'>{(calculateYesNo(toiletInformation.reviews.map(review => review.free))) ? "Si":"No"}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Acceso para personas en situación de discapacidad</h5>
                    <h5 className='text-center'>{(calculateYesNo(toiletInformation.reviews.map(review => review.disability_access))) ? "Si":"No"}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                    <h5 className='text-center'>Mudador</h5>
                    <h5 className='text-center'>{(calculateYesNo(toiletInformation.reviews.map(review => review.diaper_changing))) ? "Si":"No"}</h5>
                  </Card>
                  <br />
                  <Card bg='info' border="secondary">
                  <Card.Title>
                  <h5 className='text-center'>Horario</h5>
                  </Card.Title>
                    <h5 className='text-center'>{toiletInformation.Horario}</h5>
                  </Card>
                  
                  
                </Col>
              </Row>
            </Container>

            <Container>
              <Row>
                <Col>
                {/* <div>
                  <p>Reseñas</p>

                </div> */}
                </Col>
              </Row>
            </Container>

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