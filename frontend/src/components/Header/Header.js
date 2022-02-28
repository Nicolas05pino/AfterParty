import React from 'react';
import './Header.css'
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import Logo from '../../assets/1.png'
export default function Header() {
  return (
    <Navbar  expand="lg" className="navbar">
    <img src={Logo} alt="logo" className="logomain" />
    {/* <Form>
        <FormControl type="text" placeholder="Experimente 'Maceió'" size="lg"/>
      </Form> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav id="eachnav">
      <Nav.Link href="#anfritao" >Inicio</Nav.Link>
        <Nav.Link href="#anfritao" >Como funciona?</Nav.Link>
        <Nav.Link href="#salvos">Contácto</Nav.Link>
        <Nav.Link href="#viagens">Redes</Nav.Link>
        <Nav.Link href="#msg">Más información</Nav.Link>

      </Nav>
      <Link to="/Select">
            <button className="new">
                Alquilar mi propiedad
            </button>
        </Link>
    
    </Navbar.Collapse>
  </Navbar>
  );
}
