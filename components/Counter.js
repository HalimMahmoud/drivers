import React, { useContext } from "react";
// import { Context } from "../lib/context";
import { useData } from "../lib/useFirebase";

export default function Counter(props) {
  const { lastUpdate, loading, data, searchResult } = useData();

  const log = new Date(lastUpdate);
  if (loading) {
    return <span>Calculating</span>;
  }
  return (
    <span>{`${searchResult.length} of ${
      data.length
    } Drivers - Last Update At: ${log.toDateString()}`}</span>
  );
}
