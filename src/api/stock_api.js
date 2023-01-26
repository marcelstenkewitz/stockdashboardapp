const basePath = "https://finnhub.io/api/v1";

/*
 * Get general information of a company. You can query by symbol, ISIN or CUSIP.
 * @param {string} stockSymbol - Symbol we pass in the API call. Set by setStockSymbol.
 * @returns {Promise<Object[]>} - Response array of symbol details. 
*/
export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

/*
 * Get candlestick data for stocks - used to show current price and update chart. 
 * @param {string} stockSymbol - Symbol we pass in the API call. Set by setStockSymbol.
 * @param {string} resolution - Timeframe we query the data by. Configurations should be set in ./constants/config.js
 * @param {string} from - UNIX timestamp. Interval initial value.
 * @param {string} from - UNIX timestamp. Interval end value.
 * @returns {Promise<Object[]>} - Response containing response attributes. The following are used by this application:
 * c: List of close prices for returned candles.
*/
export const fetchHistoricalData = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
