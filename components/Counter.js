import React, { use, useContext } from "react";
// import { Context } from "../lib/context";
import { useAppStore, useData } from "../lib/useFirebase";

export default function Counter(props) {
  const { lastUpdate, loading, data, searchResult } = useAppStore();

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
