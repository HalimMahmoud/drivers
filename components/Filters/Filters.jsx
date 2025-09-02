import { Checkbox, Button, Header } from "semantic-ui-react";
import { useState, useEffect, use } from "react";

import { useAppStore } from "../../lib/useFirebase";
export default function Filters(props) {
  const init = {
    providerName: {
      "El Omda": false,
      Alalamia: false,
      Smart: false,
      Professional: false,
      ElZean: false,
    },
    blocked: { All: true, Blocked: false, "Not-blocked": false },
    pool: {
      Maadi: false,
      "M.Z.A.D": false,
      "Nasr City": false,
      Alexnadria: false,
      "Not-assigned": false,
    },
  };
  const [checkboxes, setCheckboxes] = useState(init);
  const { drivers, filterByProviders, resetFilters } = useAppStore();

  useEffect(() => {
    // console.log(
    // Object.entries(checkboxes.providerName).filter(([key, value]) => value)
    let savedProviders = [];
    for (let providerKey in checkboxes.providerName) {
      if (checkboxes.providerName[providerKey])
        savedProviders.push(providerKey);
    }
    let savedBlocked = [];
    for (let blockKey in checkboxes.blocked) {
      if (checkboxes.blocked[blockKey]) savedBlocked.push(blockKey);
    }
    let savedPools = [];
    for (let poolKey in checkboxes.pool) {
      if (checkboxes.pool[poolKey]) savedPools.push(poolKey);
    }
    filterByProviders({
      providerNames: savedProviders,
      blocked: savedBlocked,
      pools: savedPools,
    });
  }, [checkboxes]);

  useEffect(() => {
    setCheckboxes(init);
  }, [drivers]);
  return (
    <div>
      <Header as="h2">Filters</Header>
      <Header as="h4">Provider Name</Header>
      {Object.entries(checkboxes.providerName).map(([key, value]) => (
        <div key={key}>
          <Checkbox
            label={key}
            onChange={() =>
              setCheckboxes((prev) => ({
                ...prev,
                providerName: { ...prev.providerName, [key]: !value },
              }))
            }
            checked={value}
          />
        </div>
      ))}
      <Header as="h4">Blocked or Not</Header>
      {Object.entries(checkboxes.blocked).map(([key, value]) => (
        <div key={key}>
          <Checkbox
            radio
            name="checkboxRadioGroup"
            label={key}
            onChange={() =>
              setCheckboxes((prev) => ({
                ...prev,
                blocked: {
                  All: false,
                  Blocked: false,
                  "Not-blocked": false,
                  [key]: true,
                },
              }))
            }
            checked={value}
          />
        </div>
      ))}
      <Header as="h4">Pool</Header>
      Please help in completing pools to work perfectly.
      {Object.entries(checkboxes.pool).map(([key, value]) => (
        <div key={key}>
          <Checkbox
            label={key}
            onChange={() =>
              setCheckboxes((prev) => ({
                ...prev,
                pool: { ...prev.pool, [key]: !value },
              }))
            }
            checked={value}
          />
        </div>
      ))}
      <Button
        onClick={() => {
          setCheckboxes(init);
          resetFilters();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
