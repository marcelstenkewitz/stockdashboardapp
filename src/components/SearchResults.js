import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";

const SearchResults = ({ results }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);

  return (
    <ul
      className={`absolute top-12 border-2 w-40 rounded-md h-auto overflow-y-scroll z-50 custom-scrollbar ${
        darkMode
          ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
          : "bg-white border-neutral-200 "
      }`}
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2 flex item-center justify-between rounded-md transition-duration-300 ${
              darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"
            }`}
            onMouseDown={() => {
              console.log('this happened')
              setStockSymbol(item.symbol);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
