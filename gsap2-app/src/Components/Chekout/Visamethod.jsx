import React, { useEffect, useState } from "react";

function Visamethod({ setVisaValid, check, setCheck }) {

  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Update input
  const handleChange = (e) => {

    const newData = {
      ...cardData,
      [e.target.name]: e.target.value,
    };

    setCardData(newData);

    // After first submit → validate live
    if (check) {
      validate(newData);
    }
  };


  // When Checkout clicked
  useEffect(() => {
    if (check) {
      validate(cardData);
    }
  }, [check]);


  const validate = (data) => {

    let err = {};

    if (!/^\d{16}$/.test(data.number)) {
      err.number = "Card number must be 16 digits";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry)) {
      err.expiry = "Use MM/YY format";
    }

    if (!/^\d{3}$/.test(data.cvv)) {
      err.cvv = "CVV must be 3 digits";
    }

    setErrors(err);

    setVisaValid(Object.keys(err).length === 0);
  };


  return (
    <div className="space-y-4 mb-6">

      {/* Card Number */}
      <div>
        <input
          name="number"
          value={cardData.number}
          onChange={handleChange}
          placeholder="Card Number"
          maxLength={16}
          className="w-full px-4 py-2 border rounded"
        />

        {check && errors.number && (
          <p className="text-red-500 text-sm">{errors.number}</p>
        )}
      </div>


      <div className="grid grid-cols-2 gap-4">

        {/* Expiry */}
        <div>
          <input
            name="expiry"
            value={cardData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength={5}
            className="px-4 py-2 border rounded w-full"
          />

          {check && errors.expiry && (
            <p className="text-red-500 text-sm">{errors.expiry}</p>
          )}
        </div>


        {/* CVV */}
        <div>
          <input
            name="cvv"
            value={cardData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            maxLength={3}
            className="px-4 py-2 border rounded w-full"
          />

          {check && errors.cvv && (
            <p className="text-red-500 text-sm">{errors.cvv}</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Visamethod;
