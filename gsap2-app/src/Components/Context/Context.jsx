// Context.jsx
import React, { createContext, useState } from "react";

export const Cont = createContext();

function Context({ children }) {
  const [cart, setCart] = useState([]);
  const [buyNowItem, setBuyNowItem] = useState(null); // single Buy Now item
  

  return (
    <Cont.Provider value={{ cart, setCart, buyNowItem, setBuyNowItem }}>
      {children}
    </Cont.Provider>
  );
}

export default Context;
