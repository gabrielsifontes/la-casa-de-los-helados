import { Container, Navbar, Nav } from "react-bootstrap"

import "./TopMenu.scss"
import LogoUrl from "../assets/logo.png"



export default function TopMenu({
  children
}) {
  return (
    <Navbar
      className="top-menu"
      bg="primary"
      variant="dark"
    >
      <Container>
        
        <BrandNav />

        {children}
      </Container>
    </Navbar>
  )
}


function BrandNav() { /* Navegación de marca */
  return (
    <Navbar.Brand className="mr-auto">
      <img  className="logo" src={LogoUrl} alt="" />

      <h2>La casa de los helados</h2>

    </Navbar.Brand>
  )
}


function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
    </Nav>
  )
}