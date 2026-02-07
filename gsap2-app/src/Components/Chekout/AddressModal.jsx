import React, { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import axios from "axios";

 function AddressModal({ isOpen, onClose }) {
    if (!isOpen) return null;

  const [user,setUser] = useState(null)

  const email = localStorage.getItem("email")

  useEffect(()=>{
    if(!email)return
    const fetchUser = async()=>{
      try{
  const res = await axios.get(`http://localhost:5000/users?email=${email}`)
  const data = res.data[0]


  if(!data){
    console.error("user not found")
    return;
  }
    setUser(data)

}catch(err){
  console.error("userload failed")
}
    }
    fetchUser()

  },[email,isOpen])


  const [formdata, setFormdata] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    deliveryspot: "",
  });
  const [errors, setErrors] = useState({});
  const [place, setPlace] = useState("");

  const approvedStates = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
  ];

  const change = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newError = {};

    if (!formdata.name || formdata.name.length < 5)
      newError.name = "Name must be at least 5 characters";

    if (!formdata.mobile)
      newError.mobile = "Phone number is required";
    else if (!/^\d{10}$/.test(formdata.mobile))
      newError.mobile = "Phone number must be 10 digits";

    if (!formdata.pincode)
      newError.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formdata.pincode))
      newError.pincode = "Pincode must be 6 digits";

    if (!formdata.city || formdata.city.length < 3)
      newError.city = "City is required";

    if (!formdata.address || formdata.address.length < 10)
      newError.address = "Please enter full address";

    if (!formdata.state)
      newError.state = "Please select a state";

    if (!formdata.deliveryspot)
      newError.deliveryspot = "Please select delivery location";

    return newError;
  };

  const submit = async (e) => {
    e.preventDefault();
    const valid = validate();
    setErrors(valid);

    if (Object.keys(valid).length > 0) return;
    if(!user) return

    try {
        let old = user.address || [];

  let updated = [formdata, ...old];

  updated = updated.slice(0, 2);

  await axios.patch(`http://localhost:5000/users/${user.id}`, {
    address: updated,
  });

      setFormdata({
        name: "",
        mobile: "",
        pincode: "",
        city: "",
        state: "",
        address: "",
        deliveryspot: "",
      });

      setPlace("");
      setErrors({});
      onClose();
    } catch (err) {
      console.error("Address save failed:", err);
    }
  };

  const places = ["Home", "Work", "Other"];

  return (
    <form onSubmit={submit}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div
          className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          <div className="space-y-4">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-amber-600 font-medium"
            >
              <MapPin size={16} />
              Use saved location
            </button>

            <input
              name="name"
              value={formdata.name}
              onChange={change}
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              name="mobile"
              value={formdata.mobile}
              onChange={change}
              placeholder="Mobile Number"
              className="w-full border rounded-lg px-4 py-3"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}

            <div className="grid grid-cols-3 gap-3">
              <input
                name="pincode"
                value={formdata.pincode}
                onChange={change}
                placeholder="Pincode"
                className="border rounded-lg px-3 py-3"
              />
              <input
                name="city"
                value={formdata.city}
                onChange={change}
                placeholder="City"
                className="border rounded-lg px-3 py-3"
              />
              <select
                name="state"
                value={formdata.state}
                onChange={change}
                className="border rounded-lg px-3 py-3"
              >
                <option value="">Select State</option>
                {approvedStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            {(errors.pincode || errors.city || errors.state) && (
              <p className="text-red-500 text-sm">
                {errors.pincode || errors.city || errors.state}
              </p>
            )}

            <textarea
              name="address"
              value={formdata.address}
              onChange={change}
              placeholder="Street Address"
              className="w-full border rounded-lg px-4 py-3 h-24"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}

            <div className="flex gap-3">
              {places.map((plc) => (
                <button
                  type="button"
                  key={plc}
                  onClick={() => {
                    setPlace(plc);
                    setFormdata({ ...formdata, deliveryspot: plc });
                  }}
                  className={`px-4 py-2 rounded-full border ${
                    place === plc
                      ? "bg-amber-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {plc}
                </button>
              ))}
            </div>
            {errors.deliveryspot && (
              <p className="text-red-500 text-sm">{errors.deliveryspot}</p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold"
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddressModal;
