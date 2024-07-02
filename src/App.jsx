import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import TopMenu from './components/TopMenu'
import Cart from './components/Cart'
import GridProducts from './components/GridProducts'
import Loading from './components/Loading'
import Product from './components/Product'

import './App.css'
import useFetch from './hooks/useFetch'
import { urlApiProducts, STORAGE_SHOPPING_CART } from "./utils/contants"


// Proyecto terminado en 2023-12-27 por Gabriel Sifontes Serrano


function App() {  
  // CARGAR AL INICIO
  const productsResultFetch = useFetch(urlApiProducts)
  const { loading, result, error } = productsResultFetch


  
  // ESTADOS
  const [idsInCart, set_idsInCart] = useState([])
  
  
  // EFECTOS DE INICIO
  useEffect(function() {
    document.body.style.overflowX = "hidden"
    getProductsCart()
  }, [])



  // FUNCIONES
  function addProductCart(id, name) {
    const temp_idsInCart = idsInCart // por referencia
    temp_idsInCart.push(id)

    set_idsInCart(temp_idsInCart)
    
    localStorage.setItem(STORAGE_SHOPPING_CART, idsInCart)

    getProductsCart() // Para actualizar el estado del carrito

    toast.success(`${name} añadido al carrito`)
  }

  function getProductsCart() {
    const temp_idsInCart = localStorage.getItem(STORAGE_SHOPPING_CART)

    if(temp_idsInCart) {
      const temp_idsInCartSplited = temp_idsInCart.split(",")
      set_idsInCart(temp_idsInCartSplited)
    }
    else{
      set_idsInCart([])      
    }
  }



  // RENDERIZAR
  return (
    <div className='App'>
      <TopMenu
        style={{}}
      >
        <Cart
          idsInCart={idsInCart} 
          getProductsCart={getProductsCart}
          productsResultFetch={productsResultFetch}
        />       
      </TopMenu>

      
      <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
        theme="dark"        
      />


      <GridProducts>
        {
          (loading || !result)
          ? 
          <Loading />
          : 
          result.map((element, index)=> 
            <Product 
              product={element} 
              addProductCart={addProductCart} 
            />
          )            
        }
      </GridProducts>
    </div>
  )
}

export default App
