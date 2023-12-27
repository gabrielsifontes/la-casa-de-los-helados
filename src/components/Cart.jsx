import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CloseIcon from "@mui/icons-material/Close"

import { BASE_PATH, STORAGE_SHOPPING_CART } from '../utils/contants';
import {countDuplicatedItemsArray, removeArrayDuplicates, removeItemArray} from "../utils/arrayFunctions"


import "./Cart.scss"



export default function Cart({
	idsInCart, getProductsCart, productsResultFetch
}) {

	const [isCartOpen, set_isCartOpen] = useState(false)
	const [noDuplicatesIdsInCart, set_noDuplicatesIdsInCart] = useState([])
	const [cartTotalPrice, set_cartTotalPrice] = useState(0)

	const widthCartContent = isCartOpen ?400 :0 // Esto sirve para el transition del scss, e indicarle los valores del width aplicandole ese transition



	useEffect(function() {
		const idsInCartWithoutDuplicates = removeArrayDuplicates(idsInCart)
		
		set_noDuplicatesIdsInCart(idsInCartWithoutDuplicates)
	}, [idsInCart])

	
	useEffect(function() {
		const productData = []
		let totalPrice = 0
		
		const idsInCartWithoutDuplicates = removeArrayDuplicates(idsInCart)

		idsInCartWithoutDuplicates.forEach(productId => {
			const quantity = countDuplicatedItemsArray(productId, idsInCart)

			const productValue = { id: productId, quantity: quantity }

			productData.push(productValue)
		})

		if(!productsResultFetch.loading && productsResultFetch.result) {
			productsResultFetch.result.forEach(product => {
				productData.forEach(item =>  {
					if(product.id == item.id) {
						const totalValue = product.price * item.quantity
						totalPrice = totalPrice + totalValue
					}
				})
			})
		}

		set_cartTotalPrice(totalPrice)
	}, [idsInCart, productsResultFetch])



	function openCart() {
		set_isCartOpen(true)

		// document.body.style.overflowY = "hidden"
	}	

	function closeCart() {
		set_isCartOpen(false)

		document.body.style.overflowY = "scroll"
	}

	function emptyProductsInCart() {
		localStorage.removeItem(STORAGE_SHOPPING_CART)

		getProductsCart()
	}
	
	function increaseQuantity(id) {
		const quantityItemsCart = idsInCart
		quantityItemsCart.push(id)

		localStorage.setItem(STORAGE_SHOPPING_CART, quantityItemsCart)

		getProductsCart()
	}

	function decreaseQuantity(id) {
		const quantityItemsCart = idsInCart
		const result = removeItemArray(quantityItemsCart, id.toString())

		localStorage.setItem(STORAGE_SHOPPING_CART, result)

		getProductsCart()
	}




	return (
		<>
			<Button
				className="cart"
				variant="link"
			>
				{/* Carrito ocupado o vacio */}
				{idsInCart.length > 0 ? (
					<ShoppingCartIcon 
					variant="outlined"
					onClick={openCart}
					/>
				) : (
					<ProductionQuantityLimitsIcon
						variant="outlined"
						onClick={openCart}
					/>
				)}
			</Button>


			
			<div
				className="cart-content"
				style={{width: widthCartContent}}
			>
				<div 
					className='cart-content__header'
				>
					<CloseIcon 
						className='close-icon'
						onClick={closeCart}
					/>

					<h3>Carrito</h3>

					<Button
						variant='link'
						onClick={emptyProductsInCart}
					>
						<RemoveShoppingCartIcon />
						Vaciar
					</Button>
				</div>


				
				<div
					className='cart-content__products'
				>
					{noDuplicatesIdsInCart.map((element, index)=> 
						<Product 
							key={index}
							productsResultFetch={productsResultFetch}
							idsInCart={idsInCart}
							idProduct={element}
							increaseQuantity={increaseQuantity}
							decreaseQuantity={decreaseQuantity}
						/>
					)}
				</div>



				<CartContentFooter 
					cartTotalPrice={cartTotalPrice} 
				/>
			</div>
		</>
	)
}


function Product({
	productsResultFetch, 
	idsInCart,
	idProduct,
	increaseQuantity,
	decreaseQuantity
}) {
	const { loading, result } = productsResultFetch



	if(!loading && result) {
		return (
			result.map((element, index)=> {
				if(idProduct == element.id) {
					const quantity = countDuplicatedItemsArray(element.id, idsInCart)

					return (
						<div 
							className='cart-content__product'
						>
							<img 
								src={`${BASE_PATH}/${element.image}`} 
								alt={element.name} 
							/>


							<div
								className='cart-content__product-info'
							>
								<h3>{element.name.substr(0, 25)}{element.name.length > 25 ? "..." : ""}</h3>

								<p>${element.price.toFixed(2)} / unidad</p>

								<div>
									<button 
										onClick={()=> increaseQuantity(element.id)}
									>
										+
									</button>
									<button
										onClick={()=> decreaseQuantity(element.id)}
									>
										-
									</button>
									<span>
										En carrito: {quantity} {quantity > 1 ? "unidades" : "unidad"}
									</span>
								</div>
							</div>
						</div>
					)
				}
			})
		)
	}

	return null
}



function CartContentFooter({
	cartTotalPrice
}) {
	return (
		<div 
			className='cart-content__footer'
		>
			<div>
				<p>Total aproximado: </p>

				<p>${cartTotalPrice.toFixed(2)}</p>

			</div>

			<Button>Tramitar pedido</Button>
		</div>
	)
}