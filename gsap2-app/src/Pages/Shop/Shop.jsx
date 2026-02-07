import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Producthero from '../../Components/Producthero/Producthero'
import Products from '../../Components/Products/products'

function Shop() {
  return (
    <div>
      <Navbar />   
      <Producthero />
      <Products  />
      <Footer /> 
        
    </div>
  )
}

export default Shop