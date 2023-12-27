import { Container, Row } from "react-bootstrap"

import Product from "./Product"


export default function GridProducts({
  children
}) {
  
  return (
    <Container>
      <Row>
        {children}
      </Row>
    </Container>
  )
}