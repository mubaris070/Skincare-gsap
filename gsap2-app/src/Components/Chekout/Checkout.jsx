import React, { useContext, useEffect, useState } from "react";
import { Cont } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pageshero from "../Pageshero/pageshero";
import AddressModal from "./AddressModal";
import Addresses from "./Addresses";
import { v4 as uuidv4 } from "uuid"; 
import Visamethod from "./Visamethod";


function Checkout() {
  const {
    cart,
    setCart,
    buyNowItem,
    setBuyNowItem
  } = useContext(Cont);

  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const [showAddressmodal, setShowAddressmodal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // ✅ Selected address
 const [visaValid,setVisaValid] = useState(false)
 const[check,setCheck]=useState(false)


  const navigate = useNavigate();
  const email = localStorage.getItem("email")
  if(!email) return;

  useEffect(() => {
    const loadCheckoutData = async () => {
      try {

        const res = await axios.get(`http://localhost:5000/users?email=${email}`);
        const user = res.data[0]
        if (!user) return 
        if(user.buynow && user.buynow.length > 0){
          setBuyNowItem(user.buynow[0]);
        } else {
          setBuyNowItem(null)
          setCart(user.cart || []);
        }
      } catch (err) {
        console.error("Checkout load error:", err);
      }
    };

    loadCheckoutData();
  }, [setCart, setBuyNowItem]);
  




  const checkoutItems = buyNowItem ? [buyNowItem] : cart;

  const PAYMENT_METHODS = ["cash on delivery", "visa"];

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal > 0 ? 20 : 0;
  const discount = subtotal > 1800 ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;



const confirmOrder = async () => {

    if (paymentMethod === "visa") {
      setCheck(true)

        if(!visaValid){
    alert("Please enter valid card details");
      }

    return;
  }

  if (!selectedAddress) {
    alert("Please select an address before checkout!");
    return;
  }

  if (checkoutItems.length === 0) return;

  try {
    const orderId = uuidv4();

    const res = await axios.get(
      `http://localhost:5000/users?email=${email}`
    );

    const user = res.data[0];
    if (!user) return;

    // Create order
    const newOrder = {
      orderId,
      items: checkoutItems,
      subtotal,
      shippingCost,
      discount,
      total,
      paymentMethod,
      address: selectedAddress,
      orderDate: new Date().toISOString(),
    };

    // Add to previous orders
    const updatedOrders = [...(user.orders || []), newOrder];

    let updatedCart = user.cart || [];

    // BuyNow checkout
    if (buyNowItem) {
      updatedCart = updatedCart.filter(
        (item) =>
          !(
            item.productId === buyNowItem.productId &&
            item.variant === buyNowItem.variant
          )
      );
    }

    // Cart checkout
    if (!buyNowItem) {
      updatedCart = [];
    }

    // Update user
    await axios.patch(
      `http://localhost:5000/users/${user.id}`,
      {
        cart: updatedCart,
        buynow: [],
        orders: updatedOrders,
      }
    );

    // Update context
    setCart(updatedCart);
    setBuyNowItem(null);

    navigate("/order-success");

  } catch (error) {
    console.error("Order failed:", error);
    alert("Something went wrong. Please try again.");
  }
};



  

  if (checkoutItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen  font-lora text-center text-gray-500">
        <div>
        <p>No items to checkout.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 px-6 py-2 border hover:bg-gray-800 hover:text-white transition"
        >
          Go Shopping
        </button>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen font-lora bg-white pt-6 pb-16">
      <Pageshero Heading="Checkout" subhead="Checkout" link="/payment" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-8">

          <div className="flex items-center gap-6">
            <div className="w-4/5 bg-gray-100 text-gray-800 px-8 py-3 rounded-lg shadow-lg">
              <p className="font-semibold text-md">Standard Checkout</p>
              <p className="text-sm mt-1 text-gray-600">
                Standard delivery & payment options
              </p>
            </div>

            <div className="w-2/5 flex justify-center">
              <button
                onClick={() => setShowAddressmodal(true)}
                className="px-6 py-4 rounded-lg border border-gray-300 font-medium cursor-pointer
                           hover:bg-gray-800 hover:text-white transition"
              >
                + Add Address
              </button>
            </div>
          </div>

          {/* Address */}
          <AddressModal
            isOpen={showAddressmodal}
            onClose={() => setShowAddressmodal(false)}
          />
         <Addresses setSelectedAddress={setSelectedAddress} />

          {/* Order Details */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Details
            </h2>

            {checkoutItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 items-start border-b pb-6 mb-6 last:border-none"
              >
                <div className="w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center p-3 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Size:
                    <span className="text-gray-800 font-medium ml-1">
                      {item.variant}
                    </span>
                  </p>

                  <div className="flex justify-between mt-4">
                    <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      Qty:
                      <span className="font-semibold text-gray-800 ml-1">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          <section className="p-6 rounded-lg border bg-white border-gray-300">
            <h2 className="font-semibold text-gray-800 mb-4">
              💳 Payment Method
            </h2>

            <div className="flex gap-3 flex-wrap mb-6">
              {PAYMENT_METHODS.map((type) => (
                <button
                  key={type}
                  onClick={() => setPaymentMethod(type)}
                  className={`px-6 py-3  font-medium transition cursor-pointer ${
                    paymentMethod === type
                      ? "bg-gray-800 text-white px-8 py-2"

                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {paymentMethod === "visa" && (
             <Visamethod setVisaValid={setVisaValid} check={check} setCheck={setCheck}/>
            )}

            <div className="space-y-4 border-y py-6">
              <div className="flex justify-between font-bold">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Shipping</span>
                <span>₹{shippingCost}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Discount</span>
                <span>-₹{discount.toFixed(0)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black">₹{total.toFixed(0)}</span>
            </div>

            <button
              onClick={confirmOrder}
              className="w-full mt-6 bg-gradient-to-r cursor-pointer bg-gray-800 text-white px-8 py-2

                         text-white font-semibold py-3 hover:opacity-90"
            >
              Checkout →
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
