import axios from "axios";

async function Addtocart(product, setCart, quantity, selectedVariant,nav) {
  
  const email = localStorage.getItem("email");

    try {
    if (!email) {
      console.error("user not found")
      nav("/login");   
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/users?email=${email}`
    );

    const user = res.data[0];

    if (!user) {
      nav("/login");
       return;
    }

    const exCart = user.cart || [];

    const cartItem = exCart.find(
      (item) =>
        item.productId === product.id &&
        item.variant === selectedVariant.size
    );

    let updatedCart;

    if (cartItem) {
      updatedCart = exCart.map((item) =>
        item.productId === product.id &&
        item.variant === selectedVariant.size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        quantity,
        variant: selectedVariant.size,
        price: Number(selectedVariant.price),
      };

      updatedCart = [...exCart, newItem];
    }

    // Update backend
    await axios.patch(
      `http://localhost:5000/users/${user.id}`,
      { cart: updatedCart }
    );

    // ✅ Update context immediately
    setCart(updatedCart);

    console.log("Added to cart successfully");

  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

export default Addtocart;
