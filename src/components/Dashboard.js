import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { chartConfig } from "../constants/config";
import { fetchHistoricalData } from "../api/stock_api";
import {
  convertUnixTimeStampToDate,
  convertDateToUnixTimeStamp,
  createDate,
} from "../helper/date-helper";
import { fetchStockDetails } from "../api/stock_api";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [stockDetails, setStockDetails] = useState({});
  const [filter, setFilter] = useState("1W");
  const [stockTickData, setStockTickData] = useState([]);

  /*
    *Formats the data for Recharts.
    *Data refers to historical stock data.
    *data.c is the close prices for returned candles.
  */
  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimeStampToDate(data.t[index]),
      };
    });
  };


//Calculates the dollar change between the start of the historical stock data and the end.
  const calculateChange = (data) => {
    const firstDataPoint = data[0].value;
    const lastDataPoint = data[data.length - 1].value;

    return (lastDataPoint - firstDataPoint).toFixed(2)
  };


//Calculates the percent change between the start of the historical stock data and the end.
  const calculatePercentageFromData = (data) => {
    const firstDataPoint = data[0].value;
    const lastDataPoint = data[data.length - 1].value;

    return (((lastDataPoint - firstDataPoint)/firstDataPoint) * 100).toFixed(2)
  };

  //Fetches data upon stock symbol or filter change.
  useEffect(() => {
    //Calculates the start time and end time to provide the fetchHistoricalData API call.
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];

      const endDate = new Date();      console.log(endDate);
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      console.log(startDate);

      const startTimestampUnix = convertDateToUnixTimeStamp(startDate);
      const endTimestampUnix = convertDateToUnixTimeStamp(endDate);

      return { startTimestampUnix, endTimestampUnix };
    };

    //Updates the chart data.
    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;

        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setStockTickData(formatData(result));
      } catch (error) {
        setStockTickData([]);
        console.log(error);
      }
    };
    updateChartData();

    //Updates the stock details such as currency, exchange, IPO date.
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    updateStockDetails();
  }, [stockSymbol, filter]);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-2 px-2 xl:p-10 font-quicksand  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} setFilter={setFilter} filter={filter} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart data={stockTickData} />
      </div>
      <div>
        {stockTickData.length > 0 && (
          <Overview
            symbol={stockSymbol}
            price={stockTickData[stockTickData.length - 1].value}
            change={calculateChange(stockTickData)}
            changePercent={calculatePercentageFromData(stockTickData)}
            currency={stockDetails.currency}
          />
        )}
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
};

export default Dashboard;
