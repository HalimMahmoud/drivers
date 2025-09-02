import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { db } from "../lib/firebase";

const ResetShifts = ({ driverShiftData }) => {
  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    setLoading(false);
    db.collection("drivers")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          db.collection("drivers")
            .doc(doc.id)
            .set({ ...doc.data(), checkInShift: "" });
        });
      })
      .then(x => setLoading(true))
      .catch(err => console.log(err));
  };
  //Pir4cvM3hZvaksPeU1uP

  return (
    <Button loading={loading} onClick={handleOnClick}>
      Reset
    </Button>
  );
};

export default ResetShifts;
