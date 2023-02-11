import { React, useContext, useEffect } from "react";
import Card from "../Card";
import { useOverviewHelper } from './OverviewHelper';

const Overview = ({ symbol, price, change, changePercent }) => {
  const { stockOverview } = useOverviewHelper();

  return (
    <Card>
      <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text=x1 2xl:text-2xl">
        {symbol}
      </span>
      <div className="w-full h-full flex items-center justify-around m-2">
        <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
          ${Number(price) % 1 == 0 ? price : price.toFixed(2)}
          <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-">
            {stockOverview.currency}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
