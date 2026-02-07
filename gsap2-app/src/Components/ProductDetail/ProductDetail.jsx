import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ProductDetailView from './ProductDetailview';

function ProductDetail() {
const {id} = useParams();
const [detail,setDetail] = useState({})

 useEffect(()=>{
        axios.get(`http://localhost:5000/products/${id}`)
        .then((res)=>setDetail(res.data))
        .catch((err)=>console.error(err))
        
    },[id])
  return (
   <>
   <Navbar />
    <div>
        <ProductDetailView detail={detail} />
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetail