import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";

const Header = ({ name, filter, setFilter }) => {
  return (
    <>
      <div className="w-full xl:px-32">
        <div>
          <h1 className="text-3xl md:text-5xl text-ellipsis overflow-hidden whitespace-nowrap pb-2">
            {name}
          </h1>
        </div>
        <ThemeIcon />
        <Search />
        <div>
          <ul className="flex top-2 right-2 lg:mb-6">
            {Object.keys(chartConfig).map((item) => (
              <li key={item}>
                <ChartFilter
                  text={item}
                  active={filter === item}
                  onClick={() => {
                    setFilter(item);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
