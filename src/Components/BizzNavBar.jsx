import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

function BizzNavBar({storeNumber})
{
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
            <Link className="navbar-brand" to="/">Home</Link>
            <Nav className="me-auto">
                <Link className="navbar-brand" to={"/Queue/" + storeNumber}>Queue</Link>
            </Nav>
            <Nav className="me-end">
                <p className=" m-0 p-0 navbar-brand">Store: {storeNumber}</p>
            </Nav>
            </Container>
        </Navbar> 
    )
}

export default BizzNavBar;