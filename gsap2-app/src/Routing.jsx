import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Lazyload from './Components/Lazyload/Lazyload'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import Address from './Components/Chekout/AddressModal'
import OrderSuccess from './Components/Chekout/Ordersuccess'
import Register from './Layouts/Authenticate/Registration'
import Login from './Layouts/Authenticate/Login'
// import Products from './Components/Products/products'

const Cart = lazy(()=>import('./Pages/Cart/Cart'))
const Home1 = lazy(()=>import('./Pages/Home/Home1'))
const Shop = lazy(()=>import('./Pages/Shop/Shop'))
const About = lazy(()=>import('./Pages/About/About'))
const ContactUs = lazy(()=>import('./Pages/Contact/ContactUs'))
const Payment = lazy(()=>import('./Pages/Payment/Payment'))


function Routing() {
  return (
    <Suspense fallback = {<Lazyload />}>
       <Routes>
        <Route path='/' element={<Home1 />} />
        <Route path='/home' element={<Home1 />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />
        {/* <Route path='/products' element={<Products />} /> */}
        <Route path='/productdetail' element={<ProductDetail />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/address' element={< Address />} />
        <Route path='/order-success' element={< OrderSuccess />} />
        <Route path='/registration' element={< Register/>} />
        <Route path='/login' element={<Login />} />
        

        
        

       </Routes>
    </Suspense>
  )
}

export default Routing