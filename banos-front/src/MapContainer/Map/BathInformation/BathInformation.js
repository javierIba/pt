import React, { useState } from 'react';

import { Offcanvas,Container,Row,Col } from 'react-bootstrap';
import icons from '../../../icons/IconsPath'
import IconModel from '../../../icons/IconModel'
export default function BathInformation(props) {

  const show = props.show;
  const handleClose = props.handleClose;
  const toiletInformation = props.toiletInformation;
  

  const offcanvasTittle = "Información";
  const iconFullStarOptions = {
    path:icons.iconFullStar,
    fill:"gold",
    width:'30px',
    height:'30px'
  }

  const iconEmptyStarOptions = {
    path:icons.iconEmptyStar,
    fill:"gold",
    width:'30px',
    height:'30px'
  }

  function calification(toilet){
    let stars = <IconModel options = {iconFullStarOptions} />;
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
              <IconModel options = {iconFullStarOptions} />
          <IconModel options = {iconEmptyStarOptions}/>
         
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col>
              <IconModel options = {iconFullStarOptions} />
          <IconModel options = {iconEmptyStarOptions}/>
              </Col>
            </Row>
          </Container>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}