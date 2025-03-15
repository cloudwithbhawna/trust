import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/poster/logo.jpg';

const Navbar = () => {
  return (
    <BootstrapNavbar expand="lg" className="py-3" style={{ backgroundColor: "#e3f2fd" }}>
      <Container className="d-flex flex-column align-items-center">
        {/* Logo Section */}
        <div className="text-center">
          <div 
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              backgroundColor: "#fff", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              marginBottom: "10px"
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "80%",
                height: "80%",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          </div>
          <h6 className="text-muted">Bringing Humanity And Welfare for Needy Angel's</h6>
        </div>

        {/* Navigation Links */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
