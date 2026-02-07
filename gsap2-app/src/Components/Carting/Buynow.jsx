import axios from "axios";

async function Buynow(      
  product,
  setCart,
  quantity,
  selectedVariant,
  setBuyNowItem,nav
) {
  try {
    
    const email = localStorage.getItem("email")
    if(!email){
      console.error("user not found")
      nav('/login')
      return;
    }
    const res = await axios.get(`http://localhost:5000/users?email=${email}`)
    const user = res.data[0]
    if(!user){
      console.error("user not found")
      return
    }
    let cart = user.cart || []

    const existingItem = cart.find(
      (item) =>
        item.productId === product.id &&
        item.variant === selectedVariant.size
    );

      const newItem = {
      productId: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      quantity,
      variant: selectedVariant.size,
      price: Number(selectedVariant.price),
    };



    if (existingItem) {
      cart =  cart.map((itm)=>(
         itm.productId === product.id && itm.variant === selectedVariant.size
         ? {...itm,quantity:itm.quantity + quantity} :itm
      ))

    } else {
      cart  = [...cart,newItem]
    }

    const buyNow = [newItem]

  await axios.patch(`http://localhost:5000/users/${user.id}`,{
    cart,
    buynow:buyNow
  })
    setCart(cart)
    setBuyNowItem(newItem);
    nav("/payment");


    console.log("✅ Buy Now added to cart + buynow");
  } catch (err) {
    console.error("❌ Error in BuyNow:", err);
  }
}

export default Buynow;
