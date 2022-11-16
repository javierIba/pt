
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function NavbarAdmin(){
    const navigate = useNavigate();
    return(<>
        <Navbar bg="primary" variant="dark" style={{ marginBottom: "5px" }}>
            <Container>
                <Navbar.Brand href="#home">Panel de administración</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>navigate('/toiletrecomendation')}>Propuestas de baños</Nav.Link>
                        <Nav.Link onClick={()=>navigate('/toiletadmin')}>Baños</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}