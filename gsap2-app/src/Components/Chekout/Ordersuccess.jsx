import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Pageshero from "../Pageshero/pageshero";

function OrderSuccess() {
  const [latestOrder, setLatestOrder] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email")


  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users?email=${email}`)
        const user = res.data[0]
        let order = user.orders

        if (order.length === 0) {
          navigate("/shop");
          return;
        }

        const sortedOrders = [...order].sort(
  (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
);


        const ordr = sortedOrders[0];
        setLatestOrder(ordr);

        
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchLatestOrder();
  }, [navigate]);

  if (!latestOrder) {
    return (
      <div className="py-20 text-center text-gray-500 animate-pulse">
        <p>Processing your celebration...</p>
      </div>
    );
  }

  const { orderId, items, subtotal, shippingCost, discount, total, paymentMethod, address, orderDate } = latestOrder;

  return (
    <>
    

    <div className={"bg-white min-h-screen py-6 "}>
      <Navbar />

      <Pageshero Heading="Order Success" subhead="Your Order" link="/order-success" />
        <div className="max-w-4xl mx-auto px-4 space-y-8 font-lora">

          <section className="bg-[#e8fbf0] border border-[#d1f5e1] p-10 rounded-2xl text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#1a7f37] mb-6">Order Confirmed!</h2>
            <div className="space-y-2 text-gray-700">
              <p className="text-lg">Order ID: <span className="font-lora font-semibold">{orderId}</span></p>
              <p className="flex items-center justify-center gap-2">
                Order Date: 
                <span className="px-2 py-0.5 rounded text-sm font-medium">
                  {new Date(orderDate).toLocaleString()}
                </span>
              </p>
              <p className="flex items-center justify-center gap-2">
                Payment Method: 
                <span className="px-2 py-0.5 rounded text-sm font-medium uppercase">{paymentMethod}</span>
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">📦</span> Delivery Address
              </h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-bold text-gray-900">{address.name}</p>
                <p>{address.mobile}</p>
                <p>{address.address}, {address.city}</p>
                <p>{address.state} - {address.pincode}</p>
                <p className="text-sm italic mt-2 text-gray-400 font-medium">Delivery Spot: {address.deliveryspot}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">💰</span> Price Summary
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>₹{shippingCost}</span></div>
                <div className="flex justify-between text-red-500"><span>Discount</span><span>-₹{discount.toFixed(0)}</span></div>
                <div className="flex justify-between mt-4 pt-4 border-t font-bold text-xl text-gray-900">
                  <span>Total</span><span>₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>

          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="text-xl">🛍️</span> Items Purchased
            </h3>
            <div className="grid gap-4">
              {items.map((itm) => (
                <div key={`${itm.productId}-${itm.variant}`} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shrink-0 border border-gray-100">
                    <img src={itm.image} alt={itm.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{itm.name}</p>
                    <p className="text-xs text-gray-500 uppercase">Size: {itm.variant} | Qty: {itm.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">₹{itm.price * itm.quantity}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <button
              onClick={() => navigate("/shop")}
              className="group flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-black transition-all transform hover:scale-105 shadow-xl"
            >
              Continue Shopping
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default OrderSuccess;
