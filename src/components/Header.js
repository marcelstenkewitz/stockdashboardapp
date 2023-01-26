import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";

const Header = ({ name, filter, setFilter }) => {
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl pb-2">{name}</h1>
        <ThemeIcon />
        <Search />
        <div>
          <ul className="flex top-2 right-2">
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
