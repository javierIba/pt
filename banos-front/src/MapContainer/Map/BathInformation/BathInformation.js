import React, { useState } from 'react';

import { Offcanvas, Container, Row, Col } from 'react-bootstrap';
import icons from '../../../icons/IconsPath'
import IconModel from '../../../icons/IconModel'
export default function BathInformation(props) {

  const show = props.show;
  const handleClose = props.handleClose;
  const toiletInformation = props.toiletInformation;
  console.log(toiletInformation)

  const offcanvasTittle = "Información";
  const iconFullStarOptions = {
    path: icons.iconFullStar,
    fill: "gold",
    width: '30px',
    height: '30px'
  }

  const iconEmptyStarOptions = {
    path: icons.iconEmptyStar,
    fill: "gold",
    width: '30px',
    height: '30px'
  }

  function calification(starsQuantity) {
    let stars = [];
    let fullStar = <IconModel options={iconFullStarOptions} />;
    let emptyStar = <IconModel options = {iconEmptyStarOptions}/>
    for (let i = 0; i < starsQuantity; i++) {
      stars.push(fullStar);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(emptyStar)
    }
    return stars;
  }

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{offcanvasTittle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row>
              <Col>
                {calification(toiletInformation.reviews[0].calification)}

              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col>
                {/* <IconModel options = {iconFullStarOptions} />
          <IconModel options = {iconEmptyStarOptions}/> */}
              </Col>
            </Row>
          </Container>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}