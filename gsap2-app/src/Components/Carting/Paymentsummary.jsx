import React, { useContext } from 'react'
import { Cont } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Clearbuy from '../Chekout/Clearbuy';

function Paymentsummary({ source = "checkout" }) {
  const nav = useNavigate();
  const { cart, buyNowItem, setBuyNowItem } = useContext(Cont);

  const items = source === "cart" ? cart : buyNowItem ? [buyNowItem] : cart;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 1800 ? subtotal * 0.1 : 0;
  const shippingCost = subtotal > 0 ? 20 : 0;
  const total = subtotal + shippingCost - discount;

  return (
    <div className="flex items-start">
      <div className="w-full max-w-md bg-[#f0f0f2] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-lg font-bold mb-6 text-center">Payment Summary</h2>

        <div className="border-t pt-4 space-y-4 text-sm">
          <div className="flex justify-between font-bold text-sm">
            <span className="text-gray-700">Subtotal TTC</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-sm">
            <span className="text-gray-700">Delivery Charge</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-sm">
            <span className="text-gray-700">Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-t mt-4 pt-4">
          <span className="text-sm font-bold uppercase tracking-widest">Total</span>
          <span className="text-xl md:text-2xl font-black">₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={async () => {
           await Clearbuy(setBuyNowItem)
            nav('/payment')
          }}
          className="w-full mt-6 bg-gradient-to-r bg-gray-800 text-white px-8 py-2 text-white 
          font-semibold py-3   cursor-pointer transition shadow-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Paymentsummary;
