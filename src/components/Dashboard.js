import React, { useContext } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview/Overview";
import Chart from "./Chart/Chart";
import {ThemeContext, StockContext, FilterContext} from "../Context";
import { useOverviewHelper } from "./Overview/OverviewHelper"
import { useChartHelper } from "./Chart/ChartHelper";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext)
  const { filter, setFilter } = useContext(FilterContext);
  const { stockCandleData } = useChartHelper();
  const { stockOverview, calculateChange, calculatePercentChange } = useOverviewHelper();

  return (
    <div
      className={`md:h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-2 px-2 xl:p-10 font-quicksand min-h-screen  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header
          name={stockOverview.name}
          setFilter={setFilter}
          filter={filter}
        />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart data={stockCandleData}/>
      </div>
      <div>
        {stockCandleData.length > 0 && (
          <Overview
            symbol={stockSymbol}
            price={stockCandleData[stockCandleData.length - 1].value}
            change={calculateChange(stockCandleData)}
            changePercent={calculatePercentChange(stockCandleData)}
          />
        )}
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockOverview} />
      </div>
    </div>
  );
};

export default Dashboard;
