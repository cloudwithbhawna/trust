import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";

const Navbar = () => {
  return (
   <>
   <Navbar expand="lg" className="bg-light py-3">
      <Container className="d-flex flex-column align-items-center">
        {/* Logo Section */}
        <div className="text-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            width="80"
            height="80"
            className="mb-1"
          />
          <h6 className="text-muted">Your Logo Full Form</h6>
        </div>

        {/* Navigation Links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}

export default Navbar