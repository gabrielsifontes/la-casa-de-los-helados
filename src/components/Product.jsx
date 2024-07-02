import { Col, Card, Button } from "react-bootstrap"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import "./Product.scss"



export default function Product({
	product, addProductCart
}) {
	const {extraInfo, id, image, name, price} = product


	return (
		<Col
			xs={3}
			className="product"
		>
			<Card>
				<Card.Img
					variant="top"
					src={image}
				/>

				<Card.Body>
					<Card.Title>{product.name}</Card.Title>
					
					<Card.Text>{product.extraInfo}</Card.Text>
					
					<Card.Text>${product.price.toFixed(2)} / unidad</Card.Text>

					<Button 
						onClick={()=> {addProductCart(id, name)}}>
						<AddShoppingCartIcon></AddShoppingCartIcon>
						Añadir
					</Button>
				</Card.Body>
			</Card>
		</Col>
	)
}