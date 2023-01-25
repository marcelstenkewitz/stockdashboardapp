import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name }) => {
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl pb-2">{name}</h1>
        <ThemeIcon/>
        <Search />
      </div>
    </>
  );
};

export default Header;
