import axios from "axios";
import React, { useEffect, useState } from "react";

function Addresses({ setSelectedAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const email = localStorage.getItem("email");

      if (!email) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/users?email=${email}`
        );

        const user = res.data[0];
        let addr = user?.address || [];

        // ✅ Keep only last 2 addresses (optional)
        if (addr.length > 2) {
          addr = addr.slice(-2);

          await axios.patch(
            `http://localhost:5000/users/${user.id}`,
            { address: addr }
          );
        }

        setAddresses(addr);
        
       if (addr.length > 0) {
        setSelectedId(0);
        if (setSelectedAddress) {
          setSelectedAddress(addr[0]);
        }
      }
      } catch (err) {
        console.error("Fetch address error:", err);
      }
    };

    fetchAddresses();
  }, []); // ✅ Run only once

  // ✅ Manual select
  const handleSelect = (adrs, index) => {
    setSelectedId(index);

    if (setSelectedAddress) {
      setSelectedAddress(adrs);
    }
  };

  return (
    <div className="mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Select Delivery Address
      </h2>

      {addresses.length === 0 && (
        <p className="text-gray-500 text-sm">
          No address found. Please add one.
        </p>
      )}

      {addresses.map((adrs, index) => (
        <div
          key={index}
          onClick={() => handleSelect(adrs, index)}
          className={`cursor-pointer border rounded-xl p-4 transition
            ${
              selectedId === index
                ? "border-amber-500 bg-amber-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-900">{adrs.name}</p>

            {selectedId === index && (
              <span className="text-sm font-medium text-amber-600">
                Selected
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {adrs.address}, {adrs.city}, {adrs.state} - {adrs.pincode}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            📞 {adrs.mobile}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Addresses;
