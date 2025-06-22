import React, { useState } from "react";
import { Select } from "semantic-ui-react";
import { firebase, db } from "../lib/firebase";
const options = [
  {
    key: 0,
    value: "",
    text: "Not-assigned"
  },
  { key: 1, value: "Maadi", text: "Maadi" },
  { key: 2, value: "M.Z.A.D", text: "M.Z.A.D" },
  { key: 3, value: "Nasr City", text: "Nasr City" },
  { key: 4, value: "Alexnadria", text: "Alexnadria" }
];

const Pool = ({ driver }) => {
  const [pool, setPool] = useState(driver.pool);
  const handleOnChange = (e, { value }) => {
    setPool(value);
    console.log(driver.key);
    const { key, ...data } = driver;
    db.collection("drivers")
      .doc(key)
      .set({
        ...data,
        pool: value,
        updated: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
  //Pir4cvM3hZvaksPeU1uP

  return (
    <Select
      clearable
      value={pool}
      onChange={handleOnChange}
      placeholder="Select Pool"
      options={options}
      selection
    />
  );
};

export default Pool;
