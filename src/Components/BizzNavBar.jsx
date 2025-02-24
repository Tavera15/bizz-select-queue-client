import React, { useState,useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function BizzNavBar({store})
{
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
            <Link className="navbar-brand" to="/">Home</Link>
            <Nav className="me-auto">
                <Link className="navbar-brand" to={"/Queue/" + store}>Queue</Link>
            </Nav>
            <Nav className="me-end">
                <p className=" m-0 p-0 navbar-brand">Store: {store}</p>
            </Nav>
            </Container>
        </Navbar> 
    )
}

export default BizzNavBar;