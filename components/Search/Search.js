import React, { useContext } from "react";
// import { Context } from "../../lib/context";
import SearchResult from "./SearchResult";
import SearchBox from "./SearchBox";
import { useData, search } from "../../lib/useFirebase";
export default function Search({ edited }) {
  return (
    <div>
      <SearchBox />
      <SearchResult isEditable={edited} />
    </div>
  );
}
