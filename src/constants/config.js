//Config for fetchHistoricalData API call.
export const chartConfig = {
  "1D": { days: 1, weeks: 0, months: 0, years: 0, resolution: "1" },
  "1W": { days: 0, weeks: 1, months: 0, years: 0, resolution: "15" },
  "1M": { days: 0, weeks: 0, months: 1, years: 0, resolution: "60" },
  "1Y": { days: 0, weeks: 0, months: 0, years: 1, resolution: "D" },
};

//Available stock symbols we are allowed to search due to free API limitations. 
export const stockDropdownList = [
  {
    name: "TESLA INC",
    symbol: "TSLA",
  },
  {
    name: "APPLE INC",
    symbol: "AAPL",
  },
  {
    name: "MICROSOFT CORP",
    symbol: "MSFT",
  },
  {
    name: "INTL BUSINESS MACHINES CORP",
    symbol: "IBM",
  },
  {
    name: "ALPHABET INC-CL A" && "GOOGLE",
    symbol: "GOOGL",
  },
  {
    name: "META PLATFORMS INC-CLASS A",
    symbol: "META",
  },
];
