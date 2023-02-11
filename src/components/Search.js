import React, { useState, useContext } from "react";
import SearchResults from "./SearchResults";
import { ThemeContext } from "../Context";
import { stockDropdownList } from "../constants/config";

const Search = () => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [bestMatches, setBestMatches] = useState(stockDropdownList);

  const { darkMode } = useContext(ThemeContext);

  //Sets the best matches to the symbol that closest matches the input.
  const updateBestMatches = () => {
    const results = stockDropdownList.filter(
      (item) =>
        item.name.includes(input.toUpperCase()) ||
        item.symbol.includes(input.toUpperCase())
    );

    setBestMatches(results);
  };

  return (
    <div
      className={`flex items-center border-2 rounded-md relative w-60 md:w-96  ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? "bg-gray-900" : null
        }`}
        placeholder="Search stock..."
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={() => {
          updateBestMatches();
        }}
      />

      {focus && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
