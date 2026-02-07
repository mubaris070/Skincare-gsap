import { Cont } from "../Context/Context";
import axios from "axios";

async function Clearbuy(setBuyNowItem){
  try {
    const email = localStorage.getItem("email")

    const res = await axios.get(`http://localhost:5000/users?email=${email}`);
    const user = res.data[0]
    if(!user) return;

    await axios.patch(`http://localhost:5000/users/${user.id}`,{
      buynow:[]
    })


    setBuyNowItem(null);
    console.log("Buy Now cleared");
  } catch (err) {
    console.error("Error clearing Buy Now:", err);
  }
};

export default Clearbuy