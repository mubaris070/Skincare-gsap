import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Cont } from "../Context/Context";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Paymentsummary from "./Paymentsummary";
import { FiTrash2 } from "react-icons/fi";
import Pageshero from "../Pageshero/pageshero";

function Cartpage() {
  const { cart, setCart } = useContext(Cont);
  const email = localStorage.getItem("email")
  const nav = useNavigate();

useEffect(() => {
  if (!email) return;

  const fetchCart = async () => {
    const res = await axios.get(
      `http://localhost:5000/users?email=${email}`);
     const user = res.data[0];
    if (user) {
      setCart(user.cart || []);
    }
  };

  fetchCart();
}, [email]);


  const updateQty = async (item, type) => {

  const newQty =
    type === "inc"
      ? item.quantity + 1
      : Math.max(1, item.quantity - 1);

  const updatedCart = cart.map((itm) =>
    itm.productId === item.productId &&
    itm.variant === item.variant
      ? { ...itm, quantity: newQty }
      : itm
  );

  const res = await axios.get(
    `http://localhost:5000/users?email=${email}`
  );

  const user = res.data[0];

  await axios.patch(
    `http://localhost:5000/users/${user.id}`,
    { cart: updatedCart }
  );

  setCart(updatedCart);
};


  const removeItem = async (product) => {
      if (!email) return;

    const res = await axios.get(`http://localhost:5000/users?email=${email}`)
    const user = res.data[0]

      if (!user) return;

    const updated = user.cart.filter((itm)=>
      !(
      itm.productId === product.productId && itm.variant === product.variant
    ))
    await axios.patch(`http://localhost:5000/users/${user.id}`,{
      cart:updated
    })
    setCart(updated)
  };

  return (
    <div
      className={`${
        cart?.length === 0 ? "bg-[#f0f0f2]" : "bg-white"
      } min-h-screen pt-6 pb-16 font-lora`}
    >
      {cart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="No items"
            className="w-36 mb-6 opacity-60"
          />

          <h2 className="text-xl md:text-2xl font-extrabold mb-2">
            Nothing here yet
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Your cart is waiting to be filled.
          </p>

          <button
            onClick={() => nav("/shop")}
            className="border border-black px-6 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <Pageshero Heading="Shopping Cart" subhead="Cart" link="/cart" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 pt-14 pb-20">
            <div className="lg:col-span-2">
              <div className="hidden md:grid grid-cols-12 text-sm font-bold text-gray-400 uppercase border-b pb-4 mb-8">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Size</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="space-y-8 border-b pb-20 border-gray-300">
                {cart?.map((item) => (
                  <div
                    key={`${item.productId}-${item.variant}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product */}
                    <div className="md:col-span-6 flex gap-4 items-center">
  <div className="w-24 h-24 bg-[#f3f3f3] rounded-lg flex items-center justify-center">
    <img
      src={item.image}
      alt={item.name}
      className="max-h-full object-contain"
    />
  </div>

  {/* Text section */}
  <div className="flex flex-col">
    <h3 className="font-bold">{item.name}</h3>

    <p className="text-[13px] text-gray-500 mt-1 line-clamp-2">
      {item.description}
    </p>
  </div>
</div>


                    {/* Size */}
                    <div className="md:col-span-2 text-center">
                      <span className="px-3 py-2 bg-[#f3f3f3] rounded-md text-xs font-bold">
                        {item.variant}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center gap-3">
                      <button onClick={() => updateQty(item, "dec")}>
                        <Minus size={14} />
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item, "inc")}>
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex justify-end items-center gap-4">
                      <span className="font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button onClick={() => removeItem(item)}>
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Paymentsummary source="cart" />
          </div>
        </>
      )}
    </div>
  );
}

export default Cartpage;
