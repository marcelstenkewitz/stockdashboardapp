import { useState, useContext, useEffect } from "react";
import { fetchHistoricalData } from "../../api/stock_api";
import { chartConfig } from "../../constants/config";
import { useDateHelper } from "../../util/DateHelper";
import { StockContext, FilterContext } from "../../Context";

export const useChartHelper = () => {
  const [stockCandleData, setStockCandleData] = useState([]);
  const { stockSymbol } = useContext(StockContext);
  const { filter } = useContext(FilterContext);
  const { getDateRange, convertUnixTimeStampToDate } = useDateHelper();

  /*
   *Formats the data for Recharts.
   *Data refers to historical stock data.
   *data.c is the close prices for returned candles.
   */
  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        date: convertUnixTimeStampToDate(data.t[index]),
      };
    });
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
      setStockCandleData(formatData(result));
    } catch (error) {
      setStockCandleData([]);
      console.log(error);
    }
  };

  //Fetches data upon stock symbol or filter change.
  useEffect(() => {
    updateChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockSymbol, filter]);

  return {
    stockCandleData,
    formatData,
    updateChartData,
  };
};
