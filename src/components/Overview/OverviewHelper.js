import { useContext, useState, useEffect } from "react";
import { fetchStockDetails } from "../../api/stock_api";
import { StockContext, FilterContext } from "../../Context";

export const useOverviewHelper = () => {
  const { stockSymbol } = useContext(StockContext);
  const [stockOverview, setStockOverview] = useState({});
  const { filter } = useContext(FilterContext);

  //Updates the stock details such as currency, exchange, IPO date.
  const updateOverview = async () => {
    try {
      const result = await fetchStockDetails(stockSymbol);
      setStockOverview(result);
    } catch (error) {
      setStockOverview({});
      console.log(error);
    }
  };
  //Calculates the dollar change between the start of the historical stock data and the end.
  const calculateChange = (data) => {
    const firstDataPoint = data[0].value;
    const lastDataPoint = data[data.length - 1].value;

    return (lastDataPoint - firstDataPoint).toFixed(2);
  };

  //Calculates the percent change between the start of the historical stock data and the end.
  const calculatePercentChange = (data) => {
    const firstDataPoint = data[0].value;
    const lastDataPoint = data[data.length - 1].value;

    return (((lastDataPoint - firstDataPoint) / firstDataPoint) * 100).toFixed(
      2
    );
  };

  //Fetches data upon stock symbol or filter change.
  useEffect(() => {
    updateOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockSymbol, filter]);

  return {
    stockOverview,
    updateOverview,
    calculateChange,
    calculatePercentChange,
  };
};
