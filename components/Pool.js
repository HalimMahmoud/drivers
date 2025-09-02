import React, { useState } from "react";
import { Select } from "semantic-ui-react";
import { useAppStore } from "../lib/useFirebase";
const options = [
  {
    key: 0,
    value: "",
    text: "Not-assigned",
  },
  { key: 1, value: "Maadi", text: "Maadi" },
  { key: 2, value: "M.Z.A.D", text: "M.Z.A.D" },
  { key: 3, value: "Nasr City", text: "Nasr City" },
  { key: 4, value: "Alexnadria", text: "Alexnadria" },
];

const Pool = ({ driver }) => {
  const { updateDriverPool } = useAppStore();
  const [pool, setPool] = useState(driver.pool);
  const handleOnChange = (e, { value }) => {
    setPool(value);
    updateDriverPool(driver.key, value);
  };

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
