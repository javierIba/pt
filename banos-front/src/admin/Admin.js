
import './admin.css'
import ToiletRecomendation from './ToiletRecomendation/ToiletRecomendation'
import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavbarAdmin from './NavbarAdmin';

export default function Admin() {
    const navigate = useNavigate();
    return (<>
        <NavbarAdmin/>
        
    </>)



}